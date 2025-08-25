// pages/index.js
import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import SendForm from '../components/SendForm';
import Welcome from '../components/Welcome'; // We'll create this simple component

import {
  createNewWallet,
  getAccountFromMnemonic,
  saveMnemonic,
  loadMnemonic,
  deleteMnemonic,
  getBalance,
  sendTransaction,
  loadAccountCount,
  deleteAccountCount,
  saveAccountCount
} from '../lib/wallet';

export default function Home() {
  const [mnemonic, setMnemonic] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [view,setView]=useState("Dashboard");
  const [balance, setBalance] = useState("0.0"); // State for balance


  

useEffect(() => {
  console.log("acount length",accounts.length);
  if(accounts.length)
  saveAccountCount(accounts.length);
}, [accounts]); // This hook re-runs whenever activeAccount changes



   // NEW: useEffect to fetch balance when activeAccount changes
  useEffect(() => {
    if (!activeAccount) return;

    const fetchBalance = async () => {
      setBalance("..."); // Show a loading indicator
      const newBalance = await getBalance(activeAccount.address);
      setBalance(newBalance);
    };

    fetchBalance();
  }, [activeAccount]); // This hook re-runs whenever activeAccount changes


  
//   for 
  const handleSendSubmit = async (event) => {
    event.preventDefault();

    const recipient = event.target.recipient.value;
    console.log("Recipient:",recipient);

    const amount = event.target.amount.value;

    if (!recipient || !amount) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        alert("Sending transaction... Please wait.");
        const txHash = await sendTransaction(activeAccount, recipient, amount);
        alert(`Transaction sent! Hash: ${txHash}`);
        // Refresh balance after sending
        const newBalance = await getBalance(activeAccount.address);
        setBalance(newBalance);
    } catch (error) {
        console.error("Transaction failed:", error);
        alert(`Transaction failed: ${error.message}`);
    } finally {
        setView('dashboard'); // Go back to the dashboard
    }
  };



  // --- Wallet Management Functions ---

  const handleCreateWallet = () => {
    const newMnemonic = createNewWallet();
    alert(`IMPORTANT: Please save this mnemonic phrase in a secure place:\n\n${newMnemonic}`);
    saveMnemonic(newMnemonic);
    saveAccountCount(1);
    handleLogin(newMnemonic);
  };


  const handleLogin = (mnemonic) => {
    // 1. Load the number of accounts the user had previously.
    const accountCount = loadAccountCount();
    console.log("acount count after loading",accountCount);

    
    const derivedAccounts = [];
    // 2. Loop from 0 to the saved count to regenerate all accounts.
    for (let i = 0; i < accountCount; i++) {
      const account = getAccountFromMnemonic(mnemonic, i);
      derivedAccounts.push(account);
    }

    setMnemonic(mnemonic);
    setAccounts(derivedAccounts);
    // 3. Set the active account (e.g., the first one, or you could
    // also e and load the last active account's index).
    setActiveAccount(derivedAccounts[0]);
  };
  // On initial load, check if a mnemonic is already saved
  useEffect(() => {
    console.log("user refreshed");
    const savedMnemonic = loadMnemonic();
    console.log(savedMnemonic);
  
    if (savedMnemonic) {
      handleLogin(savedMnemonic);
    }
  }, []);
  const handleAddAccount = () => {
    // The new account's index is simply the current number of accounts
    const newIndex = accounts.length;
    const newAccount = getAccountFromMnemonic(mnemonic, newIndex);
    setAccounts([...accounts, newAccount]);
    setActiveAccount(newAccount); // Optionally switch to the new account
  };
  
  const handleLogout = () => {
    saveAccountCount();
    deleteMnemonic();
    setMnemonic(null);
    setAccounts([]);
    setActiveAccount(null);
    
  };

  // --- Render Logic ---

  if (!activeAccount) {
    // If there's no active account, show the welcome/login screen
    return <Welcome onCreateWallet={handleCreateWallet} />;
  }


  if (view === 'Send') {
    return <SendForm onCancel={() => setView('dashboard')} onSend={handleSendSubmit} />
  }

  // If we have an active account, show the dashboard
return (
  
    
      <Dashboard
        accounts={accounts}
        activeAccount={activeAccount}
        onAddAccount={handleAddAccount}
        onSetActiveAccount={setActiveAccount}
        onLogout={handleLogout}
        setView={setView}
        onSend={() => setView('Send')}
        balance={balance} // Pass the real balance

      
      />
    

    
  
);


}