// components/ImportForm.js

export default function ImportForm({ onImport, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const mnemonic = formData.get('mnemonic');
    onImport(mnemonic);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Import Wallet</h2>
      <p className="text-center text-gray-400 mb-6">
        Enter your 12 or 24-word secret recovery phrase.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            name="mnemonic"
            rows="4"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            placeholder="word1 word2 word3 ..."
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Import Wallet
          </button>
        </div>
      </form>
    </div>
  );
}