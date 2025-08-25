// lib/wallet.js
import { ethers } from 'ethers';

// The standard Ethereum derivation path
const ETH_DERIVATION_PATH = "m/44'/60'/0'/0/";

// initilizing the provider
const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL);

/**
 * Creates a new random wallet with a 12-word mnemonic phrase.
 * @returns {string} The mnemonic phrase.
 */
export function createNewWallet() {
  const wallet = ethers.Wallet.createRandom();
  return wallet.mnemonic.phrase;
}

/**
 * Derives a specific account from a mnemonic phrase using an index.
 * @param {string} mnemonic - The 12 or 24-word seed phrase.
 * @param {number} accountIndex - The index of the account to derive (0, 1, 2, ...).
 * @returns {ethers.Wallet} An Ethers.js Wallet instance for the derived account.
 */
export function getAccountFromMnemonic(mnemonic, accountIndex) {
  if (typeof mnemonic !== 'string' || !ethers.Mnemonic.isValidMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase provided.');
  }
  if (typeof accountIndex !== 'number' || accountIndex < 0) {
    throw new Error('Account index must be a non-negative number.');
  }

  const path = ETH_DERIVATION_PATH + accountIndex;
  const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, null, path);

  return wallet;
}

// Add these to lib/wallet.js

/**
 * Saves the mnemonic phrase to local storage.
 * In a real app, this MUST be encrypted with a strong password.
 * @param {string} mnemonic - The mnemonic phrase to save.
 */
export function saveMnemonic(mnemonic) {
  localStorage.setItem('walletMnemonic', mnemonic);
}

/**
 * Loads the mnemonic phrase from local storage.
 * @returns {string|null} The mnemonic phrase, or null if not found.
 */
export function loadMnemonic() {
  return localStorage.getItem('walletMnemonic');
}

/**
 * Deletes the mnemonic from local storage (for "logging out").
 */
export function deleteMnemonic() {
  localStorage.removeItem('walletMnemonic');
}





/**
 * Fetches the balance of a given Ethereum address.
 * @param {string} address The Ethereum address.
 * @returns {Promise<string>} The balance formatted as a string in ETH.
 */


export async function getBalance(address) {
  try {
    const balanceWei = await provider.getBalance(address);
    // formatEther converts the balance from Wei (the smallest unit) to ETH
    // console.log(balanceWei);
    return ethers.formatEther(balanceWei);
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "0.0"; // Return a default value on error
  }
}

/**
 * Sends an ETH transaction from a wallet.
 * @param {ethers.Wallet} wallet The sender's wallet instance.
 * @param {string} toAddress The recipient's address.
 * @param {string} amount The amount of ETH to send (e.g., "0.1").
 * @returns {Promise<string>} The transaction hash.
 */
export async function sendTransaction(wallet, toAddress, amount) {
  console.log("wallet",wallet);
  // To send a transaction, the wallet needs to be connected to a provider.
  const signer = wallet.connect(provider);

  const tx = {
    to: toAddress,
    // parseEther converts ETH string to Wei BigInt
    value: ethers.parseEther(amount),
  };

  const transactionResponse = await signer.sendTransaction(tx);
  // You can also wait for the transaction to be mined:
  // await transactionResponse.wait();
  return transactionResponse.hash;
}

//save the account no information
export function saveAccountCount(count) {
  localStorage.setItem('walletAccountCount', count.toString());
}


/**
 * Loads the number of accounts from local storage.
 * @returns {number} The saved count, or 1 if nothing is saved.
 */
export function loadAccountCount() {
  const count = localStorage.getItem('walletAccountCount');
  // If no count is saved, default to 1 account.
  return count ? parseInt(count, 10) : 1;
}

export function deleteAccountCount() {
  localStorage.removeItem('walletAccountCount');
}