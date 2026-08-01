import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, UserPlus, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up | Shelter Services International" }] }),
  component: SignupPage,
});

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) { setError(error); return; }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c]">
            <UserPlus className="size-7" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">Account created!</h2>
          <p className="mt-2 text-sm text-gray-500">
            Check your email for a confirmation link, then sign in.
          </p>
          <Button
            onClick={() => navigate({ to: "/login" })}
            className="mt-6 w-full bg-[#1a6b3c] text-white hover:bg-[#145530]"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <span className="grid size-12 place-items-center rounded-full border-2 border-[#1a6b3c] bg-white">
            <Leaf className="size-6 text-[#1a6b3c]" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-extrabold text-[#1a6b3c]">SHELTER SERVICES</p>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">International Limited</p>
          </div>
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-900">Create account</h1>
          <p className="mt-1 text-sm text-gray-500">Join as an importer / buyer</p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700" htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat password"
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 bg-[#1a6b3c] py-3 text-sm font-bold text-white hover:bg-[#145530] disabled:opacity-60"
            >
              {loading ? "Creating account…" : <><UserPlus className="size-4" /> Create Account</>}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#1a6b3c] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
