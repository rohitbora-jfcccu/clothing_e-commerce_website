import { Router, type Request, type Response } from "express";

import { prisma } from "../lib/prisma.js";

const router = Router();

function getQueryString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed ? trimmed : undefined;
}

function toNumber(
  value: unknown,
  fallback: number
): number {
  if (typeof value !== "string") {
    return fallback;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function serializeProduct(product: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  status: string;
  currency: string;
  price: { toString(): string };
  compareAtPrice: { toString(): string } | null;
  sku: string | null;
  barcode: string | null;
  featured: boolean;
  newArrival: boolean;
  bestseller: boolean;
  onSale: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  category:
    | {
        id: string;
        name: string;
        slug: string;
      }
    | null;
  collection:
    | {
        id: string;
        name: string;
        slug: string;
      }
    | null;
  images: Array<{
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
  }>;
  variants: Array<{
    id: string;
    sku: string | null;
    size: string | null;
    colorName: string | null;
    colorHex: string | null;
    priceOverride: { toString(): string } | null;
    compareAtPrice: { toString(): string } | null;
    stock: number;
    lowStockAt: number;
    isActive: boolean;
  }>;
  inventory:
    | {
        totalStock: number;
        reservedStock: number;
        availableStock: number;
        reorderLevel: number;
        reorderQty: number;
      }
    | null;
}) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription,
    status: product.status,
    currency: product.currency,
    price: Number(product.price.toString()),
    compareAtPrice: product.compareAtPrice
      ? Number(product.compareAtPrice.toString())
      : null,
    sku: product.sku,
    barcode: product.barcode,
    featured: product.featured,
    newArrival: product.newArrival,
    bestseller: product.bestseller,
    onSale: product.onSale,
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
    publishedAt: product.publishedAt,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,

    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug,
        }
      : null,

    collection: product.collection
      ? {
          id: product.collection.id,
          name: product.collection.name,
          slug: product.collection.slug,
        }
      : null,

    images: product.images.map((image) => ({
      id: image.id,
      url: image.url,
      publicId: image.publicId,
      altText: image.altText,
      sortOrder: image.sortOrder,
      isPrimary: image.isPrimary,
      width: image.width,
      height: image.height,
      format: image.format,
      bytes: image.bytes,
    })),

    variants: product.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      size: variant.size,
      colorName: variant.colorName,
      colorHex: variant.colorHex,
      priceOverride: variant.priceOverride
        ? Number(variant.priceOverride.toString())
        : null,
      compareAtPrice: variant.compareAtPrice
        ? Number(variant.compareAtPrice.toString())
        : null,
      stock: variant.stock,
      lowStockAt: variant.lowStockAt,
      isActive: variant.isActive,
    })),

    inventory: product.inventory
      ? {
          totalStock: product.inventory.totalStock,
          reservedStock: product.inventory.reservedStock,
          availableStock:
            product.inventory.availableStock,
          reorderLevel: product.inventory.reorderLevel,
          reorderQty: product.inventory.reorderQty,
        }
      : null,
  };
}

router.get(
  "/",
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const query = getQueryString(req.query.q);
      const category = getQueryString(
        req.query.category
      );
      const collection = getQueryString(
        req.query.collection
      );

      const page = Math.max(
        1,
        Math.floor(
          toNumber(req.query.page, 1)
        )
      );

      const limit = Math.min(
        50,
        Math.max(
          1,
          Math.floor(
            toNumber(req.query.limit, 20)
          )
        )
      );

      const featured =
        getQueryString(req.query.featured);

      const newArrival =
        getQueryString(req.query.newArrival);

      const bestseller =
        getQueryString(req.query.bestseller);

      const onSale =
        getQueryString(req.query.onSale);

      const where = {
        status: "ACTIVE" as const,

        ...(query
          ? {
              OR: [
                {
                  name: {
                    contains: query,
                  },
                },
                {
                  description: {
                    contains: query,
                  },
                },
                {
                  sku: {
                    contains: query,
                  },
                },
              ],
            }
          : {}),

        ...(category
          ? {
              category: {
                slug: category,
                isActive: true,
              },
            }
          : {}),

        ...(collection
          ? {
              collection: {
                slug: collection,
                isActive: true,
              },
            }
          : {}),

        ...(featured === "true"
          ? { featured: true }
          : {}),

        ...(newArrival === "true"
          ? { newArrival: true }
          : {}),

        ...(bestseller === "true"
          ? { bestseller: true }
          : {}),

        ...(onSale === "true"
          ? { onSale: true }
          : {}),
      };

      const skip = (page - 1) * limit;

      const [total, products] =
        await Promise.all([
          prisma.product.count({
            where,
          }),

          prisma.product.findMany({
            where,

            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },

              collection: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },

              images: {
                orderBy: {
                  sortOrder: "asc",
                },

                select: {
                  id: true,
                  url: true,
                  publicId: true,
                  altText: true,
                  sortOrder: true,
                  isPrimary: true,
                  width: true,
                  height: true,
                  format: true,
                  bytes: true,
                },
              },

              variants: {
                where: {
                  isActive: true,
                },

                orderBy: {
                  createdAt: "asc",
                },

                select: {
                  id: true,
                  sku: true,
                  size: true,
                  colorName: true,
                  colorHex: true,
                  priceOverride: true,
                  compareAtPrice: true,
                  stock: true,
                  lowStockAt: true,
                  isActive: true,
                },
              },

              inventory: {
                select: {
                  totalStock: true,
                  reservedStock: true,
                  availableStock: true,
                  reorderLevel: true,
                  reorderQty: true,
                },
              },
            },

            orderBy: {
              createdAt: "desc",
            },

            skip,
            take: limit,
          }),
        ]);

      const totalPages =
        Math.ceil(total / limit);

      res.status(200).json({
        success: true,

        data: products.map(
          serializeProduct
        ),

        meta: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage:
            page < totalPages,
          hasPreviousPage:
            page > 1,
        },
      });
    } catch (error) {
      console.error(
        "Failed to fetch products:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }
  }
);

router.get(
  "/:slug",
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const slug = getQueryString(
        req.params.slug
      );

      if (!slug) {
        res.status(400).json({
          success: false,
          message: "Product slug is required",
        });

        return;
      }

      const product =
        await prisma.product.findFirst({
          where: {
            slug,
            status: "ACTIVE",
          },

          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },

            collection: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },

            images: {
              orderBy: {
                sortOrder: "asc",
              },

              select: {
                id: true,
                url: true,
                publicId: true,
                altText: true,
                sortOrder: true,
                isPrimary: true,
                width: true,
                height: true,
                format: true,
                bytes: true,
              },
            },

            variants: {
              where: {
                isActive: true,
              },

              orderBy: {
                createdAt: "asc",
              },

              select: {
                id: true,
                sku: true,
                size: true,
                colorName: true,
                colorHex: true,
                priceOverride: true,
                compareAtPrice: true,
                stock: true,
                lowStockAt: true,
                isActive: true,
              },
            },

            inventory: {
              select: {
                totalStock: true,
                reservedStock: true,
                availableStock: true,
                reorderLevel: true,
                reorderQty: true,
              },
            },
          },
        });

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });

        return;
      }

      res.status(200).json({
        success: true,
        data: serializeProduct(product),
      });
    } catch (error) {
      console.error(
        "Failed to fetch product:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
      });
    }
  }
);

export default router;