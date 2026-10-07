"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) /
            product.compareAtPrice) *
            100
        )
      : 0;

  return (
    <article className="product-card group relative min-w-0">
      <div className="product-image-wrap relative overflow-hidden rounded-[28px] border border-white/55 bg-white/25 shadow-[0_18px_50px_rgba(80,100,130,0.10)] backdrop-blur-xl">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-white/45" />
          )}

          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
            className={`product-card-image object-cover transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Soft glass reflection */}
          <div className="product-glass-reflection pointer-events-none absolute inset-0" />

          {/* Moving water highlight */}
          <div className="product-water-glide pointer-events-none absolute inset-y-0 left-0 w-[55%]" />

          {product.badge && (
            <div className="absolute left-4 top-4 z-20 rounded-full border border-white/55 bg-white/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur-xl">
              {product.badge}
            </div>
          )}

          {discount > 0 && (
            <div className="absolute right-4 top-4 z-20 rounded-full border border-white/50 bg-slate-900/85 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-white backdrop-blur-xl">
              -{discount}%
            </div>
          )}

          <button
            type="button"
            aria-label={
              liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
            }
            onClick={() => setLiked((value) => !value)}
            className="absolute right-4 bottom-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/55 text-slate-800 shadow-[0_10px_30px_rgba(60,80,110,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/75"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 transition-all duration-300 ${
                liked
                  ? "fill-current scale-110"
                  : "fill-none group-hover:scale-105"
              }`}
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20.84 8.61c0 5.05-8.84 10.39-8.84 10.39S3.16 13.66 3.16 8.61A4.61 4.61 0 0 1 12 6.95a4.61 4.61 0 0 1 8.84 1.66Z" />
            </svg>
          </button>

          <div className="absolute inset-x-4 bottom-4 z-20 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              className="w-full rounded-full border border-white/55 bg-white/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 shadow-[0_12px_35px_rgba(60,80,110,0.14)] backdrop-blur-xl transition-all duration-300 hover:bg-white/90"
            >
              View Product
            </button>
          </div>
        </div>
      </div>

      <div className="px-1 pt-4">
        <div className="mb-1 flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {product.category}
          </p>

          {product.stock <= 10 && (
            <span className="text-[10px] font-medium text-slate-500">
              Only {product.stock} left
            </span>
          )}
        </div>

        <h3 className="text-[17px] font-medium tracking-[-0.02em] text-slate-900">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-[15px] font-semibold text-slate-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.compareAtPrice && (
            <span className="text-[13px] text-slate-400 line-through">
              ₹{product.compareAtPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">★</span>
            <span className="text-xs font-medium text-slate-700">
              {product.rating}
            </span>
            <span className="text-xs text-slate-400">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-4 w-4 rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}