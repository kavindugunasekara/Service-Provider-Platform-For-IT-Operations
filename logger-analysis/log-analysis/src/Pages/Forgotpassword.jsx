import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate some processing, e.g., contacting an API
    setTimeout(() => {
      console.log({ email });
      setIsSubmitted(true);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-1">
          <h1 className="text-2xl font-bold text-center text-gray-900">Reset your password</h1>
          <p className="text-center text-gray-500">
            Enter your email address, and we'll get back to you shortly with further instructions.
          </p>
        </div>
        <div className="p-6">
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
              <p className="text-green-800">
                If an account exists with the email <strong>{email}</strong>, you'll hear from us soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Send request"}
              </button>
            </form>
          )}
        </div>
        <div className="p-6 bg-gray-50 flex justify-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-indigo-500 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
