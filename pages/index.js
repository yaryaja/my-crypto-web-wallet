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
  deleteMnemonic
} from '../lib/wallet';

export default function Home() {
  const [mnemonic, setMnemonic] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [view,setView]=useState("Dashboard");

  // On initial load, check if a mnemonic is already saved
  useEffect(() => {
    const savedMnemonic = loadMnemonic();
    if (savedMnemonic) {
      handleLogin(savedMnemonic);
    }
  }, []);

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

  // If we have an active account, show the dashboard
return (
  <>
    {view === "Dashboard" && (
      <Dashboard
        accounts={accounts}
        activeAccount={activeAccount}
        onAddAccount={handleAddAccount}
        onSetActiveAccount={setActiveAccount}
        onLogout={handleLogout}
        setView={setView}
      />
    )}

    {view === "Send" && (
      <SendForm
        onCancel={oncancel}
        onSend={onSend}
        
      />
    )}
  </>
);


}