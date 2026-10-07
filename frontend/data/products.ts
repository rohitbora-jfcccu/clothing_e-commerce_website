export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  collection: string;
  description: string;

  price: number;
  compareAtPrice?: number;
  currency: string;

  images: string[];
  thumbnail: string;

  sizes: string[];

  colors: {
    name: string;
    hex: string;
  }[];

  stock: number;

  rating: number;
  reviewCount: number;

  badge?: string;

  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  onSale?: boolean;
};

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Structured Oversized Tee",
    slug: "structured-oversized-tee",
    category: "T-Shirts",
    collection: "New Arrivals",
    description:
      "A relaxed oversized tee made for everyday comfort with a clean structured silhouette.",

    price: 1299,
    compareAtPrice: 1599,
    currency: "INR",

    images: [
      "/images/products/structured-oversized-tee-1.webp",
      "/images/products/structured-oversized-tee-2.webp",
      "/images/products/structured-oversized-tee-3.webp",
    ],

    thumbnail:
      "/images/products/structured-oversized-tee-1.webp",

    sizes: ["XS", "S", "M", "L", "XL"],

    colors: [
      {
        name: "Black",
        hex: "#171717",
      },
      {
        name: "White",
        hex: "#F5F5F2",
      },
      {
        name: "Stone",
        hex: "#C8C4BA",
      },
    ],

    stock: 28,

    rating: 4.7,
    reviewCount: 84,

    badge: "BESTSELLER",

    featured: true,
    newArrival: true,
    bestseller: true,
  },

  {
    id: "prod-002",
    name: "Relaxed Studio Shirt",
    slug: "relaxed-studio-shirt",
    category: "Shirts",
    collection: "Everyday Essentials",
    description:
      "A softly structured shirt designed with an easy fit and lightweight everyday feel.",

    price: 1899,
    currency: "INR",

    images: [
      "/images/products/relaxed-studio-shirt-1.webp",
      "/images/products/relaxed-studio-shirt-2.webp",
      "/images/products/relaxed-studio-shirt-3.webp",
    ],

    thumbnail:
      "/images/products/relaxed-studio-shirt-1.webp",

    sizes: ["S", "M", "L", "XL"],

    colors: [
      {
        name: "Cream",
        hex: "#E9E1D2",
      },
      {
        name: "Black",
        hex: "#171717",
      },
      {
        name: "Blue",
        hex: "#8EA4B8",
      },
    ],

    stock: 19,

    rating: 4.6,
    reviewCount: 51,

    badge: "NEW",

    featured: true,
    newArrival: true,
  },

  {
    id: "prod-003",
    name: "Essential Utility Jacket",
    slug: "essential-utility-jacket",
    category: "Outerwear",
    collection: "Outerwear",
    description:
      "A lightweight utility layer combining practical details with a minimal modern silhouette.",

    price: 3499,
    compareAtPrice: 3999,
    currency: "INR",

    images: [
      "/images/products/essential-utility-jacket-1.webp",
      "/images/products/essential-utility-jacket-2.webp",
      "/images/products/essential-utility-jacket-3.webp",
    ],

    thumbnail:
      "/images/products/essential-utility-jacket-1.webp",

    sizes: ["S", "M", "L", "XL"],

    colors: [
      {
        name: "Olive",
        hex: "#66705D",
      },
      {
        name: "Black",
        hex: "#181818",
      },
    ],

    stock: 12,

    rating: 4.8,
    reviewCount: 37,

    badge: "LIMITED",

    featured: true,
    onSale: true,
  },

  {
    id: "prod-004",
    name: "Relaxed Everyday Trousers",
    slug: "relaxed-everyday-trousers",
    category: "Trousers",
    collection: "Everyday Essentials",
    description:
      "Relaxed trousers with a clean drape and versatile styling for everyday movement.",

    price: 2199,
    currency: "INR",

    images: [
      "/images/products/relaxed-everyday-trousers-1.webp",
      "/images/products/relaxed-everyday-trousers-2.webp",
      "/images/products/relaxed-everyday-trousers-3.webp",
    ],

    thumbnail:
      "/images/products/relaxed-everyday-trousers-1.webp",

    sizes: ["28", "30", "32", "34", "36"],

    colors: [
      {
        name: "Charcoal",
        hex: "#454545",
      },
      {
        name: "Beige",
        hex: "#C9BCA7",
      },
    ],

    stock: 31,

    rating: 4.5,
    reviewCount: 63,

    badge: "NEW",

    newArrival: true,
  },

  {
    id: "prod-005",
    name: "Minimal Ribbed Polo",
    slug: "minimal-ribbed-polo",
    category: "Polos",
    collection: "New Arrivals",
    description:
      "A refined ribbed polo designed with a soft hand-feel and understated proportions.",

    price: 1699,
    currency: "INR",

    images: [
      "/images/products/minimal-ribbed-polo-1.webp",
      "/images/products/minimal-ribbed-polo-2.webp",
      "/images/products/minimal-ribbed-polo-3.webp",
    ],

    thumbnail:
      "/images/products/minimal-ribbed-polo-1.webp",

    sizes: ["S", "M", "L", "XL"],

    colors: [
      {
        name: "Black",
        hex: "#171717",
      },
      {
        name: "Ivory",
        hex: "#EEEADF",
      },
    ],

    stock: 22,

    rating: 4.7,
    reviewCount: 42,

    badge: "NEW",

    newArrival: true,
  },

  {
    id: "prod-006",
    name: "Relaxed Overshirt",
    slug: "relaxed-overshirt",
    category: "Overshirts",
    collection: "Outerwear",
    description:
      "A brushed cotton overshirt with a relaxed profile made for transitional layering.",

    price: 2399,
    currency: "INR",

    images: [
      "/images/products/relaxed-overshirt-1.webp",
      "/images/products/relaxed-overshirt-2.webp",
      "/images/products/relaxed-overshirt-3.webp",
    ],

    thumbnail:
      "/images/products/relaxed-overshirt-1.webp",

    sizes: ["S", "M", "L", "XL"],

    colors: [
      {
        name: "Taupe",
        hex: "#A89B8A",
      },
      {
        name: "Black",
        hex: "#1B1B1B",
      },
    ],

    stock: 15,

    rating: 4.6,
    reviewCount: 35,

    featured: true,
  },

  {
    id: "prod-007",
    name: "Straight Fit Denim",
    slug: "straight-fit-denim",
    category: "Denim",
    collection: "Everyday Essentials",
    description:
      "A straight-fit denim essential with a clean wash and easy everyday structure.",

    price: 2799,
    compareAtPrice: 3199,
    currency: "INR",

    images: [
      "/images/products/straight-fit-denim-1.webp",
      "/images/products/straight-fit-denim-2.webp",
      "/images/products/straight-fit-denim-3.webp",
    ],

    thumbnail:
      "/images/products/straight-fit-denim-1.webp",

    sizes: ["28", "30", "32", "34", "36"],

    colors: [
      {
        name: "Indigo",
        hex: "#35465C",
      },
      {
        name: "Washed Blue",
        hex: "#8697A8",
      },
    ],

    stock: 18,

    rating: 4.7,
    reviewCount: 48,

    badge: "SALE",

    bestseller: true,
    onSale: true,
  },

  {
    id: "prod-008",
    name: "Everyday Canvas Tote",
    slug: "everyday-canvas-tote",
    category: "Accessories",
    collection: "Accessories",
    description:
      "A heavyweight canvas tote designed for simple everyday carry.",

    price: 899,
    currency: "INR",

    images: [
      "/images/products/everyday-canvas-tote-1.webp",
      "/images/products/everyday-canvas-tote-2.webp",
    ],

    thumbnail:
      "/images/products/everyday-canvas-tote-1.webp",

    sizes: ["ONE SIZE"],

    colors: [
      {
        name: "Natural",
        hex: "#D8CDBB",
      },
      {
        name: "Black",
        hex: "#1B1B1B",
      },
    ],

    stock: 34,

    rating: 4.8,
    reviewCount: 71,

    bestseller: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find(
    (product) => product.slug === slug,
  );
}

export function getProductsByCategory(
  category: string,
) {
  return products.filter(
    (product) =>
      product.category.toLowerCase() ===
      category.toLowerCase(),
  );
}

export function getProductsByCollection(
  collection: string,
) {
  return products.filter(
    (product) =>
      product.collection.toLowerCase() ===
      collection.toLowerCase(),
  );
}

export function getFeaturedProducts() {
  return products.filter(
    (product) => product.featured,
  );
}

export function getNewArrivals() {
  return products.filter(
    (product) => product.newArrival,
  );
}

export function getBestSellers() {
  return products.filter(
    (product) => product.bestseller,
  );
}

export function getSaleProducts() {
  return products.filter(
    (product) => product.onSale,
  );
}

export function getAvailableProducts() {
  return products.filter(
    (product) => product.stock > 0,
  );
}