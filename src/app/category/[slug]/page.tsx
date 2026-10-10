import { Product } from "@/components/ui/ProductCard";
import CategoryView from "@/components/category/CategoryView";

async function getCategoryProducts(slug: string): Promise<{ products: Product[], categoryName: string }> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return { products: [], categoryName: "" };
    
    // The API might just return all products and filter locally, or it actually filters. Let's assume it returns an array of products.
    // Wait, the API endpoint is /products?category=slug.
    const data: Product[] = await res.json();
    
    // Fallback: If API doesn't filter, we filter manually.
    const filtered = data.filter(p => p.category === slug);
    const categoryName = filtered.length > 0 ? filtered[0].categoryNameBn : slug;
    
    return { products: filtered, categoryName };
  } catch (error) {
    console.error("Failed to fetch category products", error);
    return { products: [], categoryName: slug };
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { products, categoryName } = await getCategoryProducts(slug);

  return <CategoryView products={products} categorySlug={slug} categoryName={categoryName} />;
}
