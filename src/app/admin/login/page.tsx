// filepath: /Users/sparshsaini/Documents/Ally-Blog-Website/ally-blog/src/app/admin/login/page.tsx
"use client"; // This needs to be a client component for useActionState

import { useFormStatus } from "react-dom";
// Use relative path instead of alias
// Assuming actions file is directly under 'admin' folder
import { login } from "../../lib/actions";
// Adjust path if needed
import { useActionState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        action={formAction}
        className="p-8 bg-white rounded shadow-md w-full max-w-sm text-black"
      >
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
          />
        </div>
        {state?.message && (
          <p className="text-sm text-red-500 mb-4">{state.message}</p>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}
