"use client";

import { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa";

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  if (isPending) {
    return <div className="py-20 text-center"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.updateUser({
      name: name
    }, {
      onSuccess: () => {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        router.refresh();
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "প্রোফাইল আপডেট করতে সমস্যা হচ্ছে");
      }
    });
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("ছবির সাইজ ২MB এর নিচে হতে হবে");
      return;
    }

    setImageLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64String = event.target?.result as string;
      const { data, error } = await authClient.updateUser({
        image: base64String
      });
      if (error) {
        toast.error("ছবি আপডেট করতে সমস্যা হচ্ছে");
      } else {
        toast.success("ছবি সফলভাবে আপডেট হয়েছে!");
        router.refresh();
      }
      setImageLoading(false);
    };
    reader.onerror = () => {
      toast.error("ছবি রিড করতে সমস্যা হচ্ছে");
      setImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6 ml-2">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-gray-500 text-sm mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div 
            className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer border-2 border-gray-100 group"
            onClick={() => fileInputRef.current?.click()}
            title="ছবি পরিবর্তন করতে ক্লিক করুন"
          >
            <img 
              src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`} 
              alt="Profile" 
              className={`w-full h-full object-cover transition-opacity ${imageLoading ? 'opacity-50' : 'group-hover:opacity-80'}`} 
            />
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">{session.user.name}</h2>
            <p className="text-gray-500 text-sm">{session.user.email}</p>
          </div>
        </div>
        <button 
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  toast.success("সফলভাবে লগআউট হয়েছে");
                  router.push("/");
                },
              },
            });
          }}
          className="btn btn-outline border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 rounded-full px-5 h-10 min-h-10 text-sm gap-2"
        >
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>
          সাইন আউট
        </button>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-6 text-lg">তথ্য</h3>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium text-gray-600">নাম</span>
            </label>
            <input
              type="text"
              className="input w-full border-gray-200 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-xl bg-gray-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn bg-green-700 hover:bg-green-800 text-white w-full rounded-xl border-none h-12 text-base font-medium"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}
