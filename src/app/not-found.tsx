import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">৪০৪ - পেজটি পাওয়া যায়নি</h1>
      <p className="text-gray-500 mb-8 text-lg text-center max-w-md">
        আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ।
      </p>
      <Link href="/" className="btn btn-success text-white px-8 py-3 rounded-full hover:shadow-lg transition-all">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
