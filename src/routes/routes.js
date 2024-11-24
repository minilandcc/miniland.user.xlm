// routes
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authcontext";

// views - main
import Main from "../views.xz/main-xz";


// views - home
import HomeUser from "../views.home/home-user";


// views - assets
import Assets from "../views.assets/assets";
import AssetsViewMarket from "../views.assets/assets-view-market";
import UnitsViewMarket from "../views.assets/units-view-market";


// views - assets
import UnitsViewInvestor from "../views.assets/units-view-investor";



// views - tokens
import Tokens from "../views.tokens/tokens";


// views - transfers
import Transfers from "../views.transfers/transfers";
import TransfersAccountCredit from "../views.transfers/transfers-account-credit";
import TransfersAccountDebit from "../views.transfers/transfers-account-debit";


// views - user
import UserDetails from "../views.user/user-details";
import Rooms from "../views.rooms/rooms";


// views - accounts
import AcccountsBaseCreate from "../views.accounts/accounts-create-base";
import AcccountsVirtualCreate from "../views.accounts/accounts-create-virtual";
import AcccountsBankCreate from "../views.accounts/accounts-create-bank";
import AcccountsMinterCreate from "../views.accounts/accounts-create-minter";


// views - documents
import UserDocsTaxNumCreate from "../views.media.docs/docs-taxnum-create";
import UserDocsAadhaarCreate from "../views.media.docs/docs-aadhaar-create";


// views - onboard
import UserOnboardName from '../views.onboard/user-onboard-name'
import UserOnboardIdentiti from "../views.onboard/user-onboard-id";
import UserOnboardMinter from "../views.onboard/user-onboard-minter";
import UserOnboardHold from "../views.onboard/user-onboard-hold";


// views - auth
import AuthMailCode from "../views.auth/auth-mail-code";
import AuthNext from "../views.auth/auth-next";
import AuthSessionX from "../views.auth/auth-session-x";
import OfferDetails from "../views.offers/offers-details";
import OfferResaleDetails from "../views.offers/offers-resale-details";
import TransfersStatementModule from "../content/transfers/transfers-statement";
import TransfersSatement from "../views.transfers/transfers-statement";
import Contracts from "../views.contracts/contracts";
import ContractDetails from "../views.contracts/contracts-details";
// import ContractDetails from "../views.contracts/contracts-details";


const routes = [
  { route: "/", content: <Main />, auth: false },

  // user
  { route: "/user/home", content: <HomeUser />, auth: true },

  // markets

  // assets
  { route: "/user/ax/:id", content: <AssetsViewMarket />, auth: true },
  { route: "/user/au/:id", content: <UnitsViewMarket />, auth: true },
  { route: "/user/vx/:id", content: <UnitsViewInvestor />, auth: true },

  // tokens
  { route: "/user/assets", content: <Tokens />, auth: true },

  // network

  // transfers
  { route: "/user/transfers", content: <Transfers />, auth: true },
  {
    route: "/user/transfers/statement",
    content: <TransfersSatement />,
    auth: true,
  },

  // contracts
  { route: "/user/vault", content: <Contracts />, auth: true },
  { route: "/user/contracts/:id", content: <ContractDetails />, auth: true },

  // asset offers
  { route: "/user/offer/:id", content: <OfferDetails />, auth: true },
  {
    route: "/user/resale/offer/:id",
    content: <OfferResaleDetails />,
    auth: true,
  },

  // transfers - funds
  {
    route: "/user/account/credit",
    content: <TransfersAccountCredit />,
    auth: true,
  },
  {
    route: "/user/account/debit",
    content: <TransfersAccountDebit />,
    auth: true,
  },

  // accounts
  {
    route: "/user/accounts/base/create",
    content: <AcccountsBaseCreate />,
    auth: true,
  },
  {
    route: "/user/accounts/virtual/create",
    content: <AcccountsVirtualCreate />,
    auth: true,
  },
  {
    route: "/user/accounts/bank/create",
    content: <AcccountsBankCreate />,
    auth: true,
  },
  {
    route: "/user/accounts/minter/create",
    content: <AcccountsMinterCreate />,
    auth: true,
  },

  // user
  { route: "/user/account", content: <UserDetails />, auth: true },

  //rooms
  { route: "/user/rooms", content: <Rooms />, auth: true },

  // documents
  {
    route: "/user/docs/taxnum/create",
    content: <UserDocsTaxNumCreate />,
    auth: true,
  },
  {
    route: "/user/docs/aadhaar/create",
    content: <UserDocsAadhaarCreate />,
    auth: true,
  },

  // onboard
  { route: "/user/onboard", content: <UserOnboardName />, auth: true },
  { route: "/user/onboard/id", content: <UserOnboardIdentiti />, auth: true },
  { route: "/user/onboard/minter", content: <UserOnboardMinter />, auth: true },
  { route: "/user/onboard/hold", content: <UserOnboardHold />, auth: true },

  // auth
  { route: "/auth", content: <AuthMailCode />, auth: false },
  { route: "/auth/next", content: <AuthNext />, auth: true },
  { route: "/auth/x", content: <AuthSessionX />, auth: true },
];


export default function RouteX() {

  const { user } = useAuth();
  // console.log (user)

  return (
    <Routes>
      {routes.map ((item,i)=>(item.auth
        ? <Route key={i} path={item.route} element={!user ? <Navigate to='/' replace /> : item.content} />
        : <Route key={i} path={item.route} element={item.content} />
      ))}
    </Routes>
  );
}