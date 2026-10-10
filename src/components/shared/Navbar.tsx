"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [currentDate, setCurrentDate] = useState("");
  
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে লগআউট হয়েছে");
        },
      },
    });
  };

  const navLinks = [
    { name: "সব পণ্য", path: "/", icon: "🛒" },
    { name: "চাল", path: "/category/chal", icon: "🍚" },
    { name: "ডাল", path: "/category/dal", icon: "🫘" },
    { name: "তেল", path: "/category/tel", icon: "🛢️" },
    { name: "সবজি", path: "/category/sobji", icon: "🥬" },
    { name: "মসলা", path: "/category/mosla", icon: "🌶️" },
    { name: "মাছ", path: "/category/mach", icon: "🐟" },
    { name: "মাংস", path: "/category/mangsho", icon: "🍗" },
    { name: "ডিম", path: "/category/dim-dui", icon: "🥚" },
  ];

  return (
    <nav className="navbar bg-base-100 shadow-sm px-4 lg:px-12 flex-col items-center sticky top-0 z-50">
      <div className="w-full flex justify-between items-center py-2">
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <span>🛒</span>
            <span className="text-green-600">বাজার দর</span>
          </Link>
          <span className="text-xs text-gray-500">{currentDate}</span>
        </div>
        
        <div className="flex gap-2 items-center">
          {session ? (
            <div className="dropdown dropdown-end">
              <div 
                tabIndex={0} 
                role="button" 
                className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                  <img 
                    alt="User profile" 
                    src={session.user.image || "https://ui-avatars.com/api/?name=" + session.user.name + "&background=random"} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {session.user.name?.split(" ")[0]}
                </span>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="12" width="12" className="text-gray-400 ml-1" xmlns="http://www.w3.org/2000/svg"><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/profile" className="justify-between">
                    আমার প্রোফাইল
                  </Link>
                </li>
                <li><button onClick={handleSignOut} className="text-red-500 mt-1">সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-outline btn-success">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm btn-success text-white">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>
      
      {/* Category Links */}
      <div className="w-full overflow-x-auto py-2">
        <ul className="flex space-x-6 text-sm whitespace-nowrap">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                href={link.path} 
                className={`font-medium pb-1 border-b-2 transition-all flex items-center gap-1 ${
                  pathname === link.path 
                    ? "text-green-600 border-green-600" 
                    : "text-gray-600 border-transparent hover:text-green-600 hover:border-green-200"
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
