"use client";

import { useState } from "react";
import ProductCard, { Product } from "@/components/ui/ProductCard";
import Link from "next/link";
import { FaSort } from "react-icons/fa";

export default function CategoryView({ products, categorySlug, categoryName }: { products: Product[], categorySlug: string, categoryName: string }) {
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।</p>
        <Link href="/" className="btn btn-success text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return a.today - b.today;
    if (sortOrder === "desc") return b.today - a.today;
    return 0; // default
  });

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span>{products[0]?.categoryIcon || "🛍️"}</span> {categoryName}
          </h1>
          <p className="text-gray-500 mt-1">মোট {toBengaliDigit(products.length)}টি পণ্য পাওয়া গেছে</p>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-outline btn-sm bg-white m-1">
            <FaSort /> সাজান: {sortOrder === "default" ? "ডিফল্ট" : sortOrder === "asc" ? "দাম: কম থেকে বেশি" : "দাম: বেশি থেকে কম"}
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={() => setSortOrder("default")}>ডিফল্ট</button></li>
            <li><button onClick={() => setSortOrder("asc")}>দাম: কম থেকে বেশি</button></li>
            <li><button onClick={() => setSortOrder("desc")}>দাম: বেশি থেকে কম</button></li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function toBengaliDigit(numberStr: string | number) {
  const engToBenMap: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return String(numberStr).replace(/[0-9]/g, match => engToBenMap[match]);
}
