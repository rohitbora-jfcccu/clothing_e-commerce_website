import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST ?? "localhost",
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER ?? "root",
  password: process.env.DATABASE_PASSWORD ?? "",
  database: process.env.DATABASE_NAME ?? "a_atelier",
  connectionLimit: 10,
});

const prisma = new PrismaClient({
  adapter,
});

type SeedColor = {
  name: string;
  hex: string;
};

type SeedProduct = {
  name: string;
  slug: string;
  category: string;
  collection: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  onSale?: boolean;
  stock: number;
  sizes: string[];
  colors: SeedColor[];
  images: string[];
};

const products: SeedProduct[] = [
  {
    name: "Structured Oversized Tee",
    slug: "structured-oversized-tee",
    category: "Premium Cotton",
    collection: "New Arrivals",
    description:
      "A structured oversized tee with a clean silhouette and premium everyday feel.",
    shortDescription:
      "A refined oversized everyday essential.",
    price: 1299,
    compareAtPrice: 1599,
    sku: "AAT-TEE-001",
    featured: true,
    newArrival: true,
    bestseller: true,
    onSale: true,
    stock: 28,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      {
        name: "Black",
        hex: "#111111",
      },
      {
        name: "White",
        hex: "#F7F7F5",
      },
      {
        name: "Stone",
        hex: "#C8C4B8",
      },
    ],
    images: [
      "/images/products/structured-oversized-tee-1.webp",
      "/images/products/structured-oversized-tee-2.webp",
      "/images/products/structured-oversized-tee-3.webp",
    ],
  },

  {
    name: "Relaxed Studio Shirt",
    slug: "relaxed-studio-shirt",
    category: "Soft Linen Blend",
    collection: "New Arrivals",
    description:
      "A relaxed studio shirt with a soft linen-blend feel and easy drape.",
    shortDescription:
      "Relaxed tailoring with an easy everyday drape.",
    price: 1899,
    sku: "AAT-SHT-002",
    featured: true,
    newArrival: true,
    stock: 19,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Cream",
        hex: "#E8DCC8",
      },
      {
        name: "Black",
        hex: "#111111",
      },
      {
        name: "Blue",
        hex: "#6D86A8",
      },
    ],
    images: [
      "/images/products/relaxed-studio-shirt-1.webp",
      "/images/products/relaxed-studio-shirt-2.webp",
      "/images/products/relaxed-studio-shirt-3.webp",
    ],
  },

  {
    name: "Essential Utility Jacket",
    slug: "essential-utility-jacket",
    category: "Lightweight Outerwear",
    collection: "Outerwear",
    description:
      "A lightweight utility jacket designed for versatile layering.",
    shortDescription:
      "A versatile lightweight layer with utility detailing.",
    price: 3499,
    compareAtPrice: 3999,
    sku: "AAT-JKT-003",
    featured: true,
    onSale: true,
    stock: 12,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Olive",
        hex: "#6C735A",
      },
      {
        name: "Black",
        hex: "#111111",
      },
    ],
    images: [
      "/images/products/essential-utility-jacket-1.webp",
      "/images/products/essential-utility-jacket-2.webp",
      "/images/products/essential-utility-jacket-3.webp",
    ],
  },

  {
    name: "Relaxed Everyday Trousers",
    slug: "relaxed-everyday-trousers",
    category: "Premium Twill",
    collection: "New Arrivals",
    description:
      "Relaxed everyday trousers with a clean, comfortable straight silhouette.",
    shortDescription:
      "Clean relaxed trousers for everyday movement.",
    price: 2199,
    sku: "AAT-TRS-004",
    newArrival: true,
    stock: 31,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      {
        name: "Charcoal",
        hex: "#34383D",
      },
      {
        name: "Beige",
        hex: "#D7C8B2",
      },
    ],
    images: [
      "/images/products/relaxed-everyday-trousers-1.webp",
      "/images/products/relaxed-everyday-trousers-2.webp",
      "/images/products/relaxed-everyday-trousers-3.webp",
    ],
  },

  {
    name: "Minimal Ribbed Polo",
    slug: "minimal-ribbed-polo",
    category: "Soft Rib Cotton",
    collection: "New Arrivals",
    description:
      "A minimal ribbed polo with a soft texture and refined profile.",
    shortDescription:
      "A clean ribbed polo with subtle texture.",
    price: 1699,
    sku: "AAT-PLO-005",
    newArrival: true,
    stock: 22,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Black",
        hex: "#111111",
      },
      {
        name: "Ivory",
        hex: "#F2EEE6",
      },
    ],
    images: [
      "/images/products/minimal-ribbed-polo-1.webp",
      "/images/products/minimal-ribbed-polo-2.webp",
      "/images/products/minimal-ribbed-polo-3.webp",
    ],
  },

  {
    name: "Relaxed Overshirt",
    slug: "relaxed-overshirt",
    category: "Brushed Cotton",
    collection: "Outerwear",
    description:
      "A brushed-cotton overshirt made for light layering.",
    shortDescription:
      "A soft overshirt for effortless layering.",
    price: 2399,
    sku: "AAT-OVS-006",
    featured: true,
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Taupe",
        hex: "#9B8D7B",
      },
      {
        name: "Black",
        hex: "#111111",
      },
    ],
    images: [
      "/images/products/relaxed-overshirt-1.webp",
      "/images/products/relaxed-overshirt-2.webp",
      "/images/products/relaxed-overshirt-3.webp",
    ],
  },

  {
    name: "Straight Fit Denim",
    slug: "straight-fit-denim",
    category: "Washed Denim",
    collection: "Everyday Essentials",
    description:
      "Straight-fit denim with a relaxed contemporary profile.",
    shortDescription:
      "A versatile straight-fit denim essential.",
    price: 2799,
    compareAtPrice: 3199,
    sku: "AAT-DNM-007",
    bestseller: true,
    onSale: true,
    stock: 18,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      {
        name: "Indigo",
        hex: "#293B67",
      },
      {
        name: "Washed Blue",
        hex: "#7B8EA6",
      },
    ],
    images: [
      "/images/products/straight-fit-denim-1.webp",
      "/images/products/straight-fit-denim-2.webp",
      "/images/products/straight-fit-denim-3.webp",
    ],
  },

  {
    name: "Everyday Canvas Tote",
    slug: "everyday-canvas-tote",
    category: "Heavyweight Canvas",
    collection: "Accessories",
    description:
      "A heavyweight canvas tote designed for everyday carry.",
    shortDescription:
      "A durable everyday carryall with a clean profile.",
    price: 899,
    sku: "AAT-TOT-008",
    bestseller: true,
    stock: 34,
    sizes: ["ONE SIZE"],
    colors: [
      {
        name: "Natural",
        hex: "#D5C2A4",
      },
      {
        name: "Black",
        hex: "#111111",
      },
    ],
    images: [
      "/images/products/everyday-canvas-tote-1.webp",
      "/images/products/everyday-canvas-tote-2.webp",
      "/images/products/everyday-canvas-tote-3.webp",
    ],
  },
];

const categoryDefinitions = [
  "Premium Cotton",
  "Soft Linen Blend",
  "Lightweight Outerwear",
  "Premium Twill",
  "Soft Rib Cotton",
  "Brushed Cotton",
  "Washed Denim",
  "Heavyweight Canvas",
];

const collectionDefinitions = [
  "New Arrivals",
  "Everyday Essentials",
  "Outerwear",
  "Accessories",
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function distributeStock(
  totalStock: number,
  variantCount: number
): number[] {
  if (variantCount <= 0) {
    return [];
  }

  const base = Math.floor(
    totalStock / variantCount
  );

  const remainder =
    totalStock % variantCount;

  return Array.from(
    { length: variantCount },
    (_, index) =>
      base +
      (index < remainder ? 1 : 0)
  );
}

async function seed() {
  console.log("Starting A ATELIER database seed...");

  const categoryMap = new Map<
    string,
    string
  >();

  for (
    const categoryName of categoryDefinitions
  ) {
    const category =
      await prisma.category.upsert({
        where: {
          slug: slugify(categoryName),
        },
        update: {
          name: categoryName,
          isActive: true,
        },
        create: {
          name: categoryName,
          slug: slugify(categoryName),
          isActive: true,
        },
      });

    categoryMap.set(
      categoryName,
      category.id
    );
  }

  const collectionMap = new Map<
    string,
    string
  >();

  for (
    const collectionName of collectionDefinitions
  ) {
    const collection =
      await prisma.collection.upsert({
        where: {
          slug: slugify(collectionName),
        },
        update: {
          name: collectionName,
          isActive: true,
        },
        create: {
          name: collectionName,
          slug: slugify(collectionName),
          isActive: true,
        },
      });

    collectionMap.set(
      collectionName,
      collection.id
    );
  }

  for (const item of products) {
    const categoryId =
      categoryMap.get(item.category);

    const collectionId =
      collectionMap.get(item.collection);

    if (!categoryId) {
      throw new Error(
        `Category not found: ${item.category}`
      );
    }

    if (!collectionId) {
      throw new Error(
        `Collection not found: ${item.collection}`
      );
    }

    const product =
      await prisma.product.upsert({
        where: {
          slug: item.slug,
        },

        update: {
          categoryId,
          collectionId,
          name: item.name,
          description: item.description,
          shortDescription:
            item.shortDescription,
          status: "ACTIVE",
          currency: "INR",
          price: item.price,
          compareAtPrice:
            item.compareAtPrice ?? null,
          sku: item.sku,
          featured: Boolean(
            item.featured
          ),
          newArrival: Boolean(
            item.newArrival
          ),
          bestseller: Boolean(
            item.bestseller
          ),
          onSale: Boolean(
            item.onSale
          ),
          publishedAt: new Date(),
        },

        create: {
          categoryId,
          collectionId,
          name: item.name,
          slug: item.slug,
          description: item.description,
          shortDescription:
            item.shortDescription,
          status: "ACTIVE",
          currency: "INR",
          price: item.price,
          compareAtPrice:
            item.compareAtPrice ?? null,
          sku: item.sku,
          featured: Boolean(
            item.featured
          ),
          newArrival: Boolean(
            item.newArrival
          ),
          bestseller: Boolean(
            item.bestseller
          ),
          onSale: Boolean(
            item.onSale
          ),
          publishedAt: new Date(),
        },
      });

    await prisma.productImage.deleteMany({
      where: {
        productId: product.id,
      },
    });

    await prisma.productImage.createMany({
      data: item.images.map(
        (url, index) => ({
          productId: product.id,
          url,
          altText: `${item.name} image ${
            index + 1
          }`,
          type: "PRODUCT",
          sortOrder: index,
          isPrimary: index === 0,
          format: "webp",
        })
      ),
    });

    await prisma.productVariant.deleteMany({
      where: {
        productId: product.id,
      },
    });

    const variantDefinitions =
      item.colors.flatMap(
        (color) =>
          item.sizes.map((size) => ({
            size,
            color,
          }))
      );

    const stockDistribution =
      distributeStock(
        item.stock,
        variantDefinitions.length
      );

    await prisma.productVariant.createMany({
      data: variantDefinitions.map(
        (variant, index) => {
          const colorCode =
            variant.color.name
              .replace(/[^a-z0-9]/gi, "")
              .slice(0, 3)
              .toUpperCase();

          const sizeCode =
            variant.size
              .replace(/[^a-z0-9]/gi, "")
              .toUpperCase();

          return {
            productId: product.id,
            sku: `${item.sku}-${colorCode}-${sizeCode}`,
            size: variant.size,
            colorName:
              variant.color.name,
            colorHex:
              variant.color.hex,
            stock:
              stockDistribution[index] ?? 0,
            lowStockAt: 5,
            isActive: true,
          };
        }
      ),
    });

    await prisma.inventory.upsert({
      where: {
        productId: product.id,
      },

      update: {
        totalStock: item.stock,
        reservedStock: 0,
        availableStock: item.stock,
        reorderLevel: 5,
        reorderQty: Math.max(
          10,
          Math.ceil(item.stock * 0.5)
        ),
      },

      create: {
        productId: product.id,
        totalStock: item.stock,
        reservedStock: 0,
        availableStock: item.stock,
        reorderLevel: 5,
        reorderQty: Math.max(
          10,
          Math.ceil(item.stock * 0.5)
        ),
      },
    });

    console.log(
      `Seeded: ${item.name}`
    );
  }

  console.log(
    "A ATELIER database seed completed successfully."
  );
}

seed()
  .catch((error) => {
    console.error(
      "Database seed failed:",
      error
    );

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });