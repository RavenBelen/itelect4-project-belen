import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "../api/client";
import useAuthStore from "../store/authStore";

interface LoginResponse {
  name: string;
  token: string;
  message?: string;
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = (await response.json()) as LoginResponse;

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      if (!result.token || !result.name) {
        throw new Error("The server did not return a login token.");
      }

      login(result.token, result.name);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-emerald-100/80 text-3xl text-emerald-700 shadow-sm dark:bg-emerald-950/50 dark:text-emerald-400">
          🔒
        </div>

        <h1 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
          Sign in to Betta Manager
        </h1>

        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Enter your account email and password.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-3 text-left">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-rose-600" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="h-10 w-full bg-[#0e4d58] text-xs font-bold text-white hover:bg-[#093941] disabled:opacity-60 dark:bg-teal-700 dark:hover:bg-teal-600"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;