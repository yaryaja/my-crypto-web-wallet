// components/Layout.js
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-10">
      <h1 className="text-5xl font-bold mb-2">MyWebWallet</h1>
      <p className="text-gray-400 mb-8">Your simple and secure web-based crypto wallet</p>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        {children}
      </div>
    </div>
  );
}