"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";

type ProductDetailClientProps = {
  product: Product;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        d="M20.8 8.9c0 5.2-8.8 10.1-8.8 10.1S3.2 14.1 3.2 8.9A4.7 4.7 0 0 1 8 4.2c1.4 0 2.8.7 4 1.9 1.2-1.2 2.6-1.9 4-1.9a4.7 4.7 0 0 1 4.8 4.7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 8h12l1 12H5L6 8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) /
          product.compareAtPrice) *
          100
      )
    : 0;

  const maxQuantity = Math.max(1, Math.min(product.stock, 10));

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(maxQuantity, current + 1));
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    alert(
      `${quantity} × ${product.name} added to bag\nSize: ${selectedSize}\nColor: ${selectedColor}`
    );
  };

  return (
    <main className="product-detail-page">
      <header className="product-detail-header">
        <div className="product-detail-header-inner liquid-glass">
          <Link href="/" className="product-back-link">
            <span aria-hidden="true">←</span>
            Back
          </Link>

          <Link href="/" className="product-detail-brand">
            A ATELIER
          </Link>

          <Link href="/#shop" className="product-shop-link">
            Shop
          </Link>
        </div>
      </header>

      <section className="product-detail-shell">
        <div className="product-detail-gallery">
          <div className="product-main-image liquid-glass">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 58vw"
              className="product-detail-main-image"
            />

            <div className="product-detail-image-shine" />

            {product.badge ? (
              <span className="product-detail-badge">
                {product.badge}
              </span>
            ) : null}

            {discount > 0 ? (
              <span className="product-detail-discount">
                -{discount}%
              </span>
            ) : null}
          </div>

          <div className="product-thumbnail-grid">
            {product.images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`product-thumbnail ${
                  selectedImage === index ? "is-active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  sizes="120px"
                  className="product-thumbnail-image"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-content">
          <p className="product-detail-category">
            {product.category}
          </p>

          <div className="product-detail-title-row">
            <div>
              <h1>{product.name}</h1>

              <div className="product-detail-rating">
                <span>★ {product.rating.toFixed(1)}</span>
                <span>
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <button
              type="button"
              className={`product-detail-wishlist ${
                wishlisted ? "is-active" : ""
              }`}
              onClick={() => setWishlisted((current) => !current)}
              aria-label={
                wishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              <HeartIcon filled={wishlisted} />
            </button>
          </div>

          <div className="product-detail-price">
            <strong>{formatPrice(product.price)}</strong>

            {product.compareAtPrice ? (
              <del>{formatPrice(product.compareAtPrice)}</del>
            ) : null}

            {discount > 0 ? (
              <span>{discount}% OFF</span>
            ) : null}
          </div>

          <p className="product-detail-description">
            {product.description}
          </p>

          <div className="product-option-block">
            <div className="product-option-heading">
              <span>COLOR</span>
              <strong>{selectedColor}</strong>
            </div>

            <div className="product-color-options">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  className={`product-color-option ${
                    selectedColor === color.name
                      ? "is-selected"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                >
                  <span
                    style={{
                      backgroundColor: color.hex,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="product-option-block">
            <div className="product-option-heading">
              <span>SIZE</span>

              <button
                type="button"
                className="product-size-guide"
                onClick={() =>
                  alert("Size guide will be available soon.")
                }
              >
                Size Guide
              </button>
            </div>

            <div className="product-size-grid">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`product-size-option ${
                    selectedSize === size
                      ? "is-selected"
                      : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-option-block">
            <div className="product-option-heading">
              <span>QUANTITY</span>

              <span>
                {product.stock <= 10
                  ? `Only ${product.stock} left`
                  : "In stock"}
              </span>
            </div>

            <div className="product-quantity-row">
              <button
                type="button"
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity >= maxQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="product-add-button"
            onClick={handleAddToBag}
          >
            <span>Add to Bag</span>
            <BagIcon />
          </button>

          <div className="product-detail-benefits">
            <div>
              <strong>Easy Returns</strong>
              <span>
                Simple return & exchange support.
              </span>
            </div>

            <div>
              <strong>Secure Checkout</strong>
              <span>
                Protected payments & order processing.
              </span>
            </div>

            <div>
              <strong>Made for Everyday</strong>
              <span>
                Considered materials and relaxed silhouettes.
              </span>
            </div>
          </div>

          <div className="product-detail-meta">
            <div>
              <span>SKU</span>
              <strong>{product.id}</strong>
            </div>

            <div>
              <span>COLLECTION</span>
              <strong>{product.collection}</strong>
            </div>

            <div>
              <span>CATEGORY</span>
              <strong>{product.category}</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}