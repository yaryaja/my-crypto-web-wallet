// components/Dashboard.js
export default function Dashboard({
  accounts,
  activeAccount,
  onAddAccount,
  onSetActiveAccount,
  onLogout,
  setView,
  onSend,
  balance
}) {
  // In a real app, you would fetch the balance for the activeAccount

  const displayAddress = `${activeAccount.address}...${activeAccount.address.substring(activeAccount.address.length - 4)}`;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <select 
          value={activeAccount.address} 
          onChange={(e) => {
            const selectedAccount = accounts.find(acc => acc.address === e.target.value);
            onSetActiveAccount(selectedAccount);
          }}
          className="bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500 font-mono"
        >
          {accounts.map((account, index) => (
            <option key={account.address} value={account.address}>
              Account {index + 1}: {`${account.address.substring(0, 6)}...`}
            </option>
          ))}
        </select>
        <button onClick={onLogout} className="text-sm text-gray-400 hover:text-white">Logout</button>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm">Active Address</p>
        <p className="text-lg font-mono break-all">{displayAddress}</p>
      </div>

      <div className="bg-gray-700 p-6 rounded-lg mb-6">
        <p className="text-gray-400 text-sm mb-2">Total Balance</p>
        <p className="text-4xl font-bold">{balance} ETH</p>
      </div>

      

      <div className="space-y-4">
         <button
          onClick={onAddAccount}
          className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          Add Account
        </button>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          onClick={onSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}