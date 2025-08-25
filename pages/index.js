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
  sendTransaction
} from '../lib/wallet';

export default function Home() {
  const [mnemonic, setMnemonic] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [view,setView]=useState("Dashboard");
  const [balance, setBalance] = useState("0.0"); // State for balance


  // On initial load, check if a mnemonic is already saved
  useEffect(() => {
    const savedMnemonic = loadMnemonic();
    if (savedMnemonic) {
      handleLogin(savedMnemonic);
    }
  }, []);

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
    handleLogin(newMnemonic);
  };

  const onCancel=()=>{
    console.log("cancelled");
  }
  const onSend=()=>{
    setView('Send');
    console.log("send");

  }

  const handleLogin = (mnemonic) => {
    setMnemonic(mnemonic);
    // Derive the first account by default
    const firstAccount = getAccountFromMnemonic(mnemonic, 0);
    setAccounts([firstAccount]);
    setActiveAccount(firstAccount);
  };

  const handleAddAccount = () => {
    // The new account's index is simply the current number of accounts
    const newIndex = accounts.length;
    const newAccount = getAccountFromMnemonic(mnemonic, newIndex);
    setAccounts([...accounts, newAccount]);
    setActiveAccount(newAccount); // Optionally switch to the new account
  };
  
  const handleLogout = () => {
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