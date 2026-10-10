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
  
  let badgeColor = "text-gray-500";
  let icon = "—";
  if (change.dir === "up") {
    badgeColor = "text-red-500 font-medium";
    icon = "▲";
  } else if (change.dir === "down") {
    badgeColor = "text-green-600 font-medium";
    icon = "▼";
  }

  const changeText = `${toBengaliDigit(Math.abs(change.pct))}%`;

  return (
    <Link 
      href={`/product/${id}`} 
      className="group relative flex flex-col justify-between bg-white rounded-2xl p-4 cursor-pointer transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md hover:border-green-500 hover:-translate-y-1"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-full text-3xl group-hover:bg-green-50 transition-colors duration-300">
          {image}
        </div>
        <div>
          <h2 className="text-base font-medium text-gray-800 leading-tight mb-1">{nameBn}</h2>
          <p className="text-gray-500 text-[13px]">প্রতি {unitMap[unit] || unit}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
          <p className="text-[20px] font-medium text-gray-900 leading-none">
            {toBengaliDigit(today)} <span className="text-[13px] text-gray-500">টাকা</span>
          </p>
        </div>
        <div className={`text-[13px] flex gap-1 items-center ${badgeColor}`}>
          <span className="text-[10px]">{icon}</span> <span>{changeText}</span>
        </div>
      </div>
    </Link>
  );
}
