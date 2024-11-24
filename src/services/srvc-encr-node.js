// encyrpt x decrypt

const CryptoJS = require('crypto-js');


export const TextSecure = async (item) => {
  
  const {text, secret} = item

  try {
    var newtext = CryptoJS.AES.encrypt(text, secret).toString();
    // console.log(newtext)
  
    return {data: newtext}
  } catch (error) {
    console.log (error)
    return {data: false}
  }

}


export const TextReverse = async (item) => {
  
  const {text, secret} = item

  try {
    var bytes  = CryptoJS.AES.decrypt(text, secret);
    var reversetext = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(reversetext)

    return {data: reversetext}

  } catch (error) {
    console.log (error)
    return {data: false}
  }

}