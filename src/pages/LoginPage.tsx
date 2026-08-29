import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "../store/authStore";

function LoginPage() {
  const [name, setName] = useState<string>("Aquarist Admin");
  const [showInput, setShowInput] = useState<boolean>(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = name.trim() || "Aquarist Admin";
    login(finalName);
    navigate("/reports");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Large Green Lock Icon */}
        <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-emerald-100/80 text-3xl text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 shadow-sm">
          🔒
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          You need to login
        </h1>

        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Please login to access the reports.
        </p>

        {showInput ? (
          <form onSubmit={handleLogin} className="mt-5 space-y-3">
            <Label htmlFor="display-name" className="sr-only">Display name</Label>
            <Input
              id="display-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name / title"
              className="h-10 text-xs text-slate-900 dark:text-white"
              autoFocus
            />
            <Button
              type="submit"
              className="h-10 w-full bg-[#0e4d58] text-xs font-bold text-white hover:bg-[#093941] dark:bg-teal-700 dark:hover:bg-teal-600"
            >
              Sign In to Reports
            </Button>
          </form>
        ) : (
          <div className="mt-6 space-y-2">
            <Button
              onClick={() => handleLogin()}
              className="h-10 w-full bg-[#0e4d58] text-xs font-bold text-white hover:bg-[#093941] dark:bg-teal-700 dark:hover:bg-teal-600"
            >
              Go to Login
            </Button>

            <button
              onClick={() => setShowInput(true)}
              className="text-[11px] text-teal-600 hover:underline dark:text-teal-400"
            >
              Customize Username
            </button>
          </div>
        )}

        <p className="mt-6 text-[10px] text-rose-500 dark:text-rose-400">
          (If not logged in, it redirects to /login)
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
