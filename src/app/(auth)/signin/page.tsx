"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন ইন হয়েছে!");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন ইন করতে সমস্যা হচ্ছে");
          setLoading(false);
        },
      }
    );
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card w-full max-w-md bg-white shadow-xl border border-gray-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">সাইন ইন করুন</h2>
          <form onSubmit={handleSignIn}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">ইমেইল</span>
              </label>
              <input
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-medium">পাসওয়ার্ড</span>
              </label>
              <input
                type="password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success text-white w-full"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "লগইন"}
            </button>
          </form>

          <div className="divider">অথবা</div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleSocialLogin("google")}
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FaGoogle className="text-red-500" /> Google দিয়ে লগইন করুন
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FaGithub /> GitHub দিয়ে লগইন করুন
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-green-600 font-semibold hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
