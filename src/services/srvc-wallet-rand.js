const algosdk = require('algosdk')
const { formatJsonRpcRequest } = require('@json-rpc-tools/utils')

export const getClientInstance = async chain => {
  return new algosdk.Algodv2(
    '',
    `https://${chain || 'testnet'}-api.algonode.cloud`,
    ''
  )
}

export const CreateRandWallet = async item => {
  try {
    const account = algosdk.generateAccount()
    const mnemonic = algosdk.secretKeyToMnemonic(account.sk)
    // console.log(account, mnemonic)
    return {
      data: { address: account.addr, mnemonic: mnemonic, secret: '******' }
    }
  } catch (error) {
    console.log(error)
    return { data: false }
  }
}


export const CreateAlgorandWallet = async item => {
  try {
    const account = algosdk.generateAccount()
    const mnemonic = algosdk.secretKeyToMnemonic(account.sk)
    // console.log(account, mnemonic)
    return {
      data: { address: account.addr, mnemonic: mnemonic, secret: '******' }
    }
  } catch (error) {
    console.log(error)
    return { data: false }
  }
}

export const SignOptInTrxn = async data => {
  try {
    const { chain, asset, account } = data
    if (!asset || !chain || !account) {
      return
    }
    const suggestedParams = await new algosdk.Algodv2(
      '',
      `https://${chain}-api.algonode.cloud`,
      ''
    )
      .getTransactionParams()
      .do()
    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: account,
      to: account,
      amount: 0,
      assetIndex: +asset,
      suggestedParams
    })
    const txnsToSign = {
      txn: Buffer.from(algosdk.encodeUnsignedTransaction(optInTxn)).toString(
        'base64'
      ),
      message:
        'This transaction opts you into the given assetid if you have not already opted in.'
    }
    return txnsToSign
  } catch (error) {
    return null
  }
}

export const TrxnProcess = async data => {
  try {
    const { connector, chain, txnsToSign = [] } = data
    const walletTxns = txnsToSign.map(
      ({ txn, signers, authAddr, message }) => ({
        txn,
        signers, // TODO: put auth addr in signers array
        authAddr,
        message
      })
    )
    // sign transaction
    const requestParams = [walletTxns]
    const request = formatJsonRpcRequest('algo_signTxn', requestParams)
    const result = await connector.sendCustomRequest(request)
    // console.log('Raw response:', result)
    const decodedResult = result.map(element =>
      element ? new Uint8Array(Buffer.from(element, 'base64')) : null
    )
    const signedTxnInfo = algosdk.decodeSignedTransaction(decodedResult[0])
    const txID = signedTxnInfo.txn.txID()
    const signedTxns = decodedResult.map(item => item)
    return await TrxnNetworkSubmit(signedTxns, chain)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const TrxnNetworkSubmit = async (signedTxns, chain) => {
  const client = await getClientInstance(chain)
  const { txId } = await client.sendRawTransaction(signedTxns[0]).do()
  let lastStatus = await client.status().do()
  let lastRound = lastStatus['last-round']

  while (true) {
    const status = await client.pendingTransactionInformation(txId, 'json').do()
    if (status['pool-error']) {
      throw new Error(`Transaction Pool Error: ${status['pool-error']}`)
    } else if (status['confirmed-round']) {
      return { status, txId }
    }
    lastStatus = await client.statusAfterBlock(lastRound + 1).do()
    lastRound = lastStatus['last-round']
  }
}
