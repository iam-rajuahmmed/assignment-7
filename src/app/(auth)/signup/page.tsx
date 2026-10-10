"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.signUp.email(
      { email, password, name },
      {
        onSuccess: () => {
          toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে! লগইন করুন।");
          router.push("/signin");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হচ্ছে");
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
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card w-full max-w-md bg-white shadow-xl border border-gray-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">অ্যাকাউন্ট তৈরি করুন</h2>
          <form onSubmit={handleSignUp}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">নাম</span>
              </label>
              <input
                type="text"
                placeholder="আপনার নাম লিখুন"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="পাসওয়ার্ড লিখুন"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success text-white w-full"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "রেজিস্টার"}
            </button>
          </form>

          <div className="divider">অথবা</div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleSocialLogin("google")}
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FaGoogle className="text-red-500" /> Google দিয়ে রেজিস্ট্রেশন করুন
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FaGithub /> GitHub দিয়ে রেজিস্ট্রেশন করুন
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-gray-600">
            আগেই অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-600 font-semibold hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
