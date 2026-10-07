import {
  products as fallbackProducts,
  type Product as StoreProduct,
} from "@/data/products";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5050";

type ApiProductImage = {
  id: string;
  url: string;
  publicId: string | null;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
  width: number | null;
  height: number | null;
  format: string | null;
  bytes: number | null;
};

type ApiProductVariant = {
  id: string;
  sku: string;
  size: string;
  colorName: string;
  colorHex: string;
  priceOverride: number | null;
  compareAtPrice: number | null;
  stock: number;
  lowStockAt: number;
  isActive: boolean;
};

type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  status: string;
  currency: string;
  price: number;
  compareAtPrice: number | null;
  sku: string;
  barcode: string | null;
  featured: boolean;
  newArrival: boolean;
  bestseller: boolean;
  onSale: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  collection: {
    id: string;
    name: string;
    slug: string;
  };
  images: ApiProductImage[];
  variants: ApiProductVariant[];
  inventory: {
    totalStock: number;
    reservedStock: number;
    availableStock: number;
    reorderLevel: number;
    reorderQty: number;
  } | null;
};

type ApiProductsResponse = {
  success: boolean;
  data: ApiProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

type ApiProductResponse = {
  success: boolean;
  data: ApiProduct;
};

function getFallbackProduct(
  slug: string
): StoreProduct | undefined {
  return fallbackProducts.find(
    (product) => product.slug === slug
  );
}

function mapApiProduct(
  product: ApiProduct
): StoreProduct {
  const fallback = getFallbackProduct(
    product.slug
  );

  const sortedImages = [...product.images].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  const imageUrls = sortedImages
    .map((image) => image.url)
    .filter(Boolean);

  const primaryImage =
    sortedImages.find(
      (image) => image.isPrimary
    )?.url ??
    imageUrls[0] ??
    fallback?.thumbnail ??
    "";

  const activeVariants =
    product.variants.filter(
      (variant) => variant.isActive
    );

  const sizes = Array.from(
    new Set(
      activeVariants
        .map((variant) => variant.size)
        .filter(Boolean)
    )
  );

  const colors = Array.from(
    new Map(
      activeVariants
        .filter((variant) =>
          Boolean(variant.colorName)
        )
        .map((variant) => [
          variant.colorName,
          {
            name: variant.colorName,
            hex: variant.colorHex,
          },
        ])
    ).values()
  );

  const stock =
    product.inventory?.availableStock ??
    activeVariants.reduce(
      (total, variant) =>
        total + Math.max(0, variant.stock),
      0
    );

  const badge =
    fallback?.badge ??
    (product.bestseller
      ? "BESTSELLER"
      : product.newArrival
        ? "NEW"
        : product.onSale
          ? "SALE"
          : undefined);

  return {
    id: fallback?.id ?? product.id,
    name: product.name,
    slug: product.slug,
    category: product.category.name,
    collection: product.collection.name,
    description: product.description,
    price: product.price,
    compareAtPrice:
      product.compareAtPrice ??
      undefined,
    currency: product.currency,
    images:
      imageUrls.length > 0
        ? imageUrls
        : fallback?.images ?? [],
    thumbnail: primaryImage,
    sizes:
      sizes.length > 0
        ? sizes
        : fallback?.sizes ?? [],
    colors:
      colors.length > 0
        ? colors
        : fallback?.colors ?? [],
    stock,
    rating: fallback?.rating ?? 0,
    reviewCount:
      fallback?.reviewCount ?? 0,
    badge,
    featured: product.featured,
    newArrival: product.newArrival,
    bestseller: product.bestseller,
    onSale: product.onSale,
  };
}

export type ProductsResponse = {
  success: boolean;
  data: StoreProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/products`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status}`
    );
  }

  const result: ApiProductsResponse =
    await response.json();

  return {
    ...result,
    data: result.data.map(mapApiProduct),
  };
}

export async function getProductBySlug(
  slug: string
): Promise<StoreProduct | null> {
  const response = await fetch(
    `${API_BASE_URL}/api/products/${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product: ${response.status}`
    );
  }

  const result: ApiProductResponse =
    await response.json();

  return mapApiProduct(result.data);
}