import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlugAction } from "@/app/actions/productActions";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import ProductCard from "@/components/ProductCard";
import { dbConnect } from "@/lib/db";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await dbConnect();
  const resolvedParams = await params;
  const data = await getProductBySlugAction(resolvedParams.slug);
  if (!data) {
    return {
      title: "Product Not Found",
    };
  }
  return {
    title: `${data.product.title} | Reature Organic`,
    description: data.product.description.slice(0, 160),
    alternates: {
      canonical: `/product/${resolvedParams.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  await dbConnect();
  const resolvedParams = await params;
  
  const detailData = await getProductBySlugAction(resolvedParams.slug);
  if (!detailData) {
    notFound();
  }

  const { product, reviews, relatedProducts } = detailData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Top Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
        
        {/* Left Column: Gallery */}
        <ProductGallery images={product.images} />

        {/* Right Column: details client controller */}
        <ProductDetailsClient
          product={product}
          reviews={reviews}
          relatedProducts={relatedProducts}
        />

      </div>

      {/* Related Products Grid */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-darkText">Related Remedies</h2>
            <p className="text-xs text-gray-500 mt-2">Discover similar organic combinations formulated to target equivalent wellness profiles.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
