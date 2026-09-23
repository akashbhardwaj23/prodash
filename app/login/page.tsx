"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-6 rounded-3xl border border-white p-8 shadow"
    >
      <div>
        <h1 className="text-2xl font-bold">Product Admin</h1>
        <p className="mt-1 text-sm text-neutral-200">
          Sign in to manage products
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-100 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Username
        </label>

        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full rounded-lg border p-3"
          placeholder="Username"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border p-3"
          placeholder="Password"
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-lg text-sm bg-white cursor-pointer p-3 text-black disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-sm text-neutral-400">
        Demo credentials:
        <br />
        Username: <b>emilys</b>
        <br />
        Password: <b>emilyspass</b>
      </div>
    </form>
  );
}