import Hero from "@/components/home/Hero";
import PriceTicker from "@/components/home/PriceTicker";
import ProductCard, { Product } from "@/components/ui/ProductCard";
import { notFound } from "next/navigation";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  
  if (!products || products.length === 0) {
    return <div className="text-center py-20 text-red-500">ডেটা লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।</div>;
  }

  // Risers: change.dir === 'up', sorted by pct descending
  const risers = [...products]
    .filter(p => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Fallers: change.dir === 'down', sorted by pct descending (since pct is negative in API but absolute value might be needed, let's sort by smallest pct or just pct)
  // Wait, in API change.pct is a positive number for 'up' and negative for 'down' usually, or absolute. Let's sort by pct.
  // In the API, pct can be negative for down. e.g. -2.9. So we sort by lowest pct.
  const fallers = [...products]
    .filter(p => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="w-full">
      <div className="-mx-4 lg:-mx-6 mb-8">
        <PriceTicker products={products} />
      </div>
      
      <Hero />

      {/* Section A — “আজ দাম বেড়েছে ▲” */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {risers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section B — “আজ দাম কমেছে ▼” */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-green-500">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fallers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section C — “সব পণ্য” */}
      <section id="সব-পণ্য" className="mb-12 pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">সব পণ্য</h2>
        <p className="text-gray-500 mb-6">দৈনন্দিন প্রয়োজনীয় সকল বাজার সদাই</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
