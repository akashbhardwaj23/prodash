"use client";

import { useAuth } from "@/hooks/useAuth";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useState,
} from "react";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await loginUser({
        username,
        password,
      });

      console.log("Login response:", response);

      login(
        response.accessToken,
        response
      );

      router.push("/products");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Invalid Username and Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-6 rounded-lg border-[4px_4px_2px_2px] p-6"
    >
      <div>
        <h1 className="text-3xl font-bold">
          Login As Admin
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
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
          onChange={(event) =>
            setUsername(event.target.value)
          }
          className="w-full rounded-lg border-[1px_1px_3px_3px] p-3 outline-sky-200 focus:ring-sky-200"
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
          onChange={(event) =>
            setPassword(event.target.value)
          }
          className="w-full rounded-lg border-[1px_1px_3px_3px] p-3 outline-sky-200 focus:ring-sky-200"
          placeholder="Password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer rounded-lg bg-background p-3 text-sm text-black border-[3px_3px_2px_2px] border-sky-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Logging in..."
          : "Login"}
      </button>

      <div className="flex justify-center text-sm text-neutral-500">
        <div>
          Demo credentials:
          <br />
          Username: <b>emilys</b>
          <br />
          Password: <b>emilyspass</b>
        </div>
      </div>
    </form>
  );
}