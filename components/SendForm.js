// components/SendForm.js
export default function SendForm({ onCancel, onSend }) {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-center mb-6">Send ETH</h2>
        <form onSubmit={onSend}>
          <div className="mb-4">
            <label htmlFor="recipient" className="block text-gray-300 text-sm font-bold mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="0x..."
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="0.0"
              required
            />
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
              onClick={onSend}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Send Transaction
            </button>
          </div>
        </form>
      </div>
    );
  }