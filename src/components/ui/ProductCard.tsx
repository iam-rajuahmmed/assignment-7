import Link from "next/link";

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

export function toBengaliDigit(numberStr: string | number) {
  const engToBenMap: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    '.': '.', '-': '-'
  };
  return String(numberStr).replace(/[0-9]/g, match => engToBenMap[match]);
}

const unitMap: { [key: string]: string } = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস"
};

export default function ProductCard({ product }: { product: Product }) {
  const { id, nameBn, image, unit, today, change } = product;
  
  let badgeColor = "bg-gray-100 text-gray-700";
  let icon = "—";
  if (change.dir === "up") {
    badgeColor = "bg-red-100 text-red-700";
    icon = "▲";
  } else if (change.dir === "down") {
    badgeColor = "bg-green-100 text-green-700";
    icon = "▼";
  }

  const changeText = `${toBengaliDigit(Math.abs(change.pct))}%`;

  return (
    <Link href={`/product/${id}`} className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-4 cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div className="text-4xl">{image}</div>
        <div className={`px-2 py-0.5 rounded text-xs font-bold flex gap-1 items-center ${badgeColor}`}>
          <span>{icon}</span> <span>{changeText}</span>
        </div>
      </div>
      <h2 className="text-lg font-bold text-gray-900 leading-none mb-1.5">{nameBn}</h2>
      <p className="text-gray-500 text-sm mb-3">প্রতি {unitMap[unit] || unit}</p>
      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-400">আজকের দাম</span>
        <span className="font-bold text-lg text-gray-900">{toBengaliDigit(today)} টাকা</span>
      </div>
    </Link>
  );
}
