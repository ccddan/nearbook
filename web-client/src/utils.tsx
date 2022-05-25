import { Contract, WalletConnection, connect, keyStores } from "near-api-js";

import getConfig from "./config";

let window: any = Window;
const nearConfig = getConfig(process.env.NODE_ENV || "development");

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect({
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    ...nearConfig,
  });

  window.walletConnection = new WalletConnection(near, null);

  window.accountId = window.walletConnection.getAccountId();

  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: ["getGreeting"],
      changeMethods: ["setGreeting"],
    }
  );
}

export function logout() {
  window.walletConnection.signOut();
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName);
}
