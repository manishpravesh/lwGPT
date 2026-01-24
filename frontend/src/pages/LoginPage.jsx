import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-n-8 relative overflow-hidden pt-20 pb-20">
      {/* Animated gradient backgrounds */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 -left-1/2 w-full h-full bg-gradient-to-r from-color-1/10 to-color-2/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-1/2 w-full h-full bg-gradient-to-l from-color-3/10 to-color-5/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <span className="text-2xl lg:text-3xl font-bold text-n-1 hover:text-color-1 transition-colors">
              LawGpt
            </span>
          </Link>
          <h1 className="h2 mb-2 text-n-1">Welcome Back</h1>
          <p className="body-2 text-n-3">
            Sign in to access your legal assistant
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Glass morphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-n-7/50 to-n-8/50 backdrop-blur-lg rounded-2xl border border-n-6/50" />

          <form
            onSubmit={handleSubmit}
            className="relative p-8 space-y-6 rounded-2xl"
          >
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-color-3/10 border border-color-3/30 rounded-lg">
                <p className="text-sm text-color-3 font-medium">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-n-3"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-n-7/50 border border-n-6 text-n-1 placeholder-n-4 transition-all duration-200 focus:outline-none focus:border-color-1 focus:bg-n-7/70 focus:ring-2 focus:ring-color-1/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-n-3"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-n-7/50 border border-n-6 text-n-1 placeholder-n-4 transition-all duration-200 focus:outline-none focus:border-color-1 focus:bg-n-7/70 focus:ring-2 focus:ring-color-1/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full relative inline-flex items-center justify-center h-12 px-6 rounded-lg font-code text-xs font-bold uppercase tracking-wider text-n-8 bg-gradient-to-r from-color-1 to-color-2 transition-all duration-200 hover:shadow-lg hover:shadow-color-1/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-n-6" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-n-8 text-n-4">New to LawGpt?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link
              to="/register"
              className="w-full inline-flex items-center justify-center h-12 px-6 rounded-lg font-code text-xs font-bold uppercase tracking-wider text-n-1 border border-n-6 transition-all duration-200 hover:border-color-1 hover:text-color-1 hover:bg-color-1/5"
            >
              Create Account
            </Link>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center text-n-4 caption mt-8">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-color-1 hover:text-color-2 transition-colors"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
