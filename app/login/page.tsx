"use client";

import { useActionState } from "react";
import { loginAction } from "./action";

const initialState: { error?: string } = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg text-black">
        <h1 className="mb-6 text-center text-3xl font-bold text-black">
          Admin Login
        </h1>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-black">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="admin@example.com"
              className="w-full rounded border border-gray-300 p-3 text-black placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-black">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="********"
              className="w-full rounded border border-gray-300 p-3 text-black placeholder:text-gray-400"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {pending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}