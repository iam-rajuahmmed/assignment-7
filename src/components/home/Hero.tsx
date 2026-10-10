"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  return (
    <section className="bg-green-50/50 rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between mb-12 shadow-sm border border-gray-100">
      <div className="w-full md:w-3/5 mb-8 md:mb-0 lg:pr-10">
        {currentDate && (
          <div className="inline-block bg-green-100 text-green-700 font-medium px-4 py-1.5 rounded-full text-sm mb-6">
            {currentDate}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 leading-tight mb-6 whitespace-nowrap">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-xl">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a 
          href="#সব-পণ্য" 
          className="inline-block bg-green-700 text-white font-medium px-8 py-3 rounded-xl shadow-md hover:bg-green-800 transition-colors"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="w-full md:w-2/5 flex justify-end items-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <Image 
            src="/bazar-hero.png" 
            alt="Bazar Dor Hero" 
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
