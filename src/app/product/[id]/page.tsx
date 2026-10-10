import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Product, toBengaliDigit } from "@/components/ui/ProductCard";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${id}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch product", error);
    return null;
  }
}

export const instant = false;
export default async function ProductDetails({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">পণ্যটি পাওয়া যায়নি</h2>
      </div>
    );
  }

  const { image, nameBn, categoryNameBn, unit, markets, change } = product;
  const unitBn = unit === 'kg' ? 'কেজি' : unit === 'litre' ? 'লিটার' : unit === 'dozen' ? 'ডজন' : 'পিস';

  let minPrice = Infinity;
  let maxPrice = -Infinity;
  let totalMin = 0;
  let totalMax = 0;

  markets.forEach(m => {
    if (m.min < minPrice) minPrice = m.min;
    if (m.max > maxPrice) maxPrice = m.max;
    totalMin += m.min;
    totalMax += m.max;
  });

  const avgPrice = Math.round((totalMin + totalMax) / (markets.length * 2));

  // Placeholder for price diff, can be dynamic if historical data was used, but for now matching the UI style
  const priceDiffText = change.dir === 'up' 
    ? <span className="font-bold text-red-600">বেড়েছে</span> 
    : change.dir === 'down' 
      ? <span className="font-bold text-green-600">কমেছে</span> 
      : <span className="font-bold">অপরিবর্তিত রয়েছে</span>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <span>হোম</span> <span className="text-xs">&gt;</span> <span>{categoryNameBn}</span> <span className="text-xs">&gt;</span> <span className="text-gray-900">{nameBn}</span>
      </div>

      <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-100/80 rounded-[20px] flex items-center justify-center text-5xl shrink-0">
            {image}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{nameBn}</h1>
            <p className="text-gray-500 text-sm mb-3">প্রতি {unitBn} - {categoryNameBn}</p>
            <p className="text-gray-600 text-sm">গতকালের তুলনায় আজ দাম {priceDiffText}</p> 
          </div>
        </div>
        
        <div className="bg-green-50/30 rounded-2xl p-5 text-center border border-gray-100 min-w-36">
          <p className="text-gray-500 text-xs mb-2">আজকের দাম</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{toBengaliDigit(avgPrice)}</p>
          <p className="text-gray-500 text-xs mb-3">টাকা / {unitBn}</p>
          <p className={`text-sm font-bold flex items-center justify-center gap-1 ${change.dir === 'up' ? 'text-red-500' : change.dir === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
            {change.dir === 'up' ? '▲' : change.dir === 'down' ? '▼' : '—'} {toBengaliDigit(Math.abs(change.pct))}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-100 shadow-sm rounded-2xl p-5">
            <p className="text-gray-500 text-sm mb-2">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-600 mb-1">{toBengaliDigit(minPrice)} <span className="text-base font-normal">টাকা</span></p>
            <p className="text-gray-500 text-xs">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="border border-gray-100 shadow-sm rounded-2xl p-5">
            <p className="text-gray-500 text-sm mb-2">সর্বাধিক দাম</p>
            <p className="text-2xl font-bold text-red-500 mb-1">{toBengaliDigit(maxPrice)} <span className="text-base font-normal">টাকা</span></p>
            <p className="text-gray-500 text-xs">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="border border-gray-100 shadow-sm rounded-2xl p-5">
            <p className="text-gray-500 text-sm mb-2">গড় দাম</p>
            <p className="text-2xl font-bold text-green-600 mb-1">{toBengaliDigit(avgPrice)} <span className="text-base font-normal">টাকা</span></p>
            <p className="text-gray-500 text-xs">প্রতি {unitBn}-এর হিসাবে</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="font-medium bg-transparent px-0 py-3">বাজার</th>
                <th className="font-medium bg-transparent px-0 py-3">বিভাগ</th>
                <th className="font-medium bg-transparent px-0 py-3 text-center">সর্বনিম্ন</th>
                <th className="font-medium bg-transparent px-0 py-3 text-center">সর্বাধিক</th>
                <th className="font-medium bg-transparent px-0 py-3 text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((market, idx) => {
                 const avg = Math.round((market.min + market.max) / 2);
                 return (
                   <tr key={idx} className="border-b border-gray-100 text-sm text-gray-800 hover:bg-gray-50/50 transition-colors">
                     <td className="px-0 py-5">{market.market}</td>
                     <td className="px-0 py-5">{market.division}</td>
                     <td className="px-0 py-5 text-center">{toBengaliDigit(market.min)} টাকা</td>
                     <td className="px-0 py-5 text-center">{toBengaliDigit(market.max)} টাকা</td>
                     <td className="px-0 py-5 text-right font-bold text-gray-900">{toBengaliDigit(avg)} টাকা</td>
                   </tr>
                 )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
