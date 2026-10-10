import { Product, toBengaliDigit } from "@/components/ui/ProductCard";

export default function PriceTicker({ products }: { products: Product[] }) {
  return (
    <div className="w-full bg-slate-900 text-white overflow-hidden py-2 shadow-inner whitespace-nowrap">
      <div className="inline-block animate-[marquee_120s_linear_infinite] hover:[animation-play-state:paused]">
        {products.map((p, idx) => (
          <span key={idx} className="inline-flex items-center gap-2 mx-4 text-sm">
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span>{toBengaliDigit(p.today)} ৳</span>
            <span
              className={`font-semibold ${
                p.change.dir === "up"
                  ? "text-red-400"
                  : p.change.dir === "down"
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              {p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"}{" "}
              {toBengaliDigit(Math.abs(p.change.pct))}%
            </span>
            <span className="text-gray-600 mx-2">|</span>
          </span>
        ))}
        {/* Duplicate for smooth infinite scroll */}
        {products.map((p, idx) => (
          <span key={`dup-${idx}`} className="inline-flex items-center gap-2 mx-4 text-sm">
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span>{toBengaliDigit(p.today)} ৳</span>
            <span
              className={`font-semibold ${
                p.change.dir === "up"
                  ? "text-red-400"
                  : p.change.dir === "down"
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              {p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"}{" "}
              {toBengaliDigit(Math.abs(p.change.pct))}%
            </span>
            <span className="text-gray-600 mx-2">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
