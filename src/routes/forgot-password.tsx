import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Leaf, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password | Shelter Services International" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://shelterservicesinternational.com/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
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
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              International Limited
            </p>
          </div>
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c]">
                <Mail className="size-7" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900">Check your inbox</h2>
              <p className="mt-2 text-sm text-gray-500">
                We've sent a password reset link to <strong>{email}</strong>.
              </p>
              <Button
                onClick={() => navigate({ to: "/login" })}
                className="mt-6 w-full bg-[#1a6b3c] text-white hover:bg-[#145530]"
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-gray-900">Forgot password?</h1>
              <p className="mt-1 text-sm text-gray-500">
                Enter your email and we'll send you a reset link.
              </p>

              {error && (
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700" htmlFor="email">
                    Email address
                  </label>
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

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1a6b3c] py-3 text-sm font-bold text-white hover:bg-[#145530] disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Send Reset Link"}
                </Button>
              </form>

              <Link
                to="/login"
                className="mt-5 flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#1a6b3c]"
              >
                <ArrowLeft className="size-4" /> Back to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
