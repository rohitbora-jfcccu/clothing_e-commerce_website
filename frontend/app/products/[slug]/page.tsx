import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function normalizeSlug(value: string): string {
  return decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const normalizedSlug = normalizeSlug(slug);

  const product = products.find(
    (item) =>
      normalizeSlug(item.slug) === normalizedSlug
  );

  if (!product) {
    return {
      title: "Product Not Found | A ATELIER",
    };
  }

  return {
    title: `${product.name} | A ATELIER`,
    description: product.description,

    alternates: {
      canonical: `/products/${product.slug}`,
    },

    openGraph: {
      title: `${product.name} | A ATELIER`,
      description: product.description,
      type: "website",

      images: product.thumbnail
        ? [
            {
              url: product.thumbnail,
              alt: product.name,
            },
          ]
        : undefined,
    },
  };
}

function ProductPageFallback() {
  return (
    <main
      className="product-detail-page"
      aria-busy="true"
      aria-label="Loading product"
    >
      <div
        className="liquid-glass"
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          margin: "24px",
          padding: "32px",
          borderRadius: "28px",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.5,
            }}
          >
            A ATELIER
          </p>

          <p
            style={{
              margin: "10px 0 0",
              fontSize: "0.9rem",
              opacity: 0.6,
            }}
          >
            Loading product…
          </p>
        </div>
      </div>
    </main>
  );
}

async function ProductPageContent({
  params,
}: PageProps) {
  const { slug } = await params;

  const normalizedSlug = normalizeSlug(slug);

  const product = products.find(
    (item) =>
      normalizeSlug(item.slug) === normalizedSlug
  );

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient product={product} />
  );
}

export default function ProductDetailPage({
  params,
}: PageProps) {
  return (
    <Suspense fallback={<ProductPageFallback />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}