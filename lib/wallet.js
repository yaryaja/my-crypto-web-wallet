// lib/wallet.js
import { ethers } from 'ethers';

// The standard Ethereum derivation path
const ETH_DERIVATION_PATH = "m/44'/60'/0'/0/";

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