// components/Welcome.js
export default function Welcome({ onCreateWallet, onShowImport }) { // <-- Add onShowImport
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">Welcome!</h2>
      <p className="text-center text-gray-300 mb-8">
        Create a new wallet or import an existing one to get started.
      </p>
      <div className="space-y-4">
        <button
          onClick={onCreateWallet}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          Create New Wallet
        </button>
        <button
          onClick={onShowImport} // <-- Connect the function here
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          Import Wallet
        </button>
      </div>
    </div>
  );
}