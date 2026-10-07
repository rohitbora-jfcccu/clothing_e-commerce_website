"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import {
  products,
  type Product,
} from "@/data/products";

type CatalogFilter =
  | "all"
  | "new"
  | "essentials"
  | "outerwear"
  | "accessories";

type CartItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  thumbnail: string;
  size: string;
  color: string;
  quantity: number;
};

const CART_KEY = "a-atelier-cart";
const WISHLIST_KEY = "a-atelier-wishlist";
const NEWSLETTER_KEY = "a-atelier-newsletter";

const categories: Array<{
  title: string;
  eyebrow: string;
  description: string;
  tone: string;
  filter: Exclude<CatalogFilter, "all">;
}> = [
  {
    title: "New Arrivals",
    eyebrow: "JUST DROPPED",
    description: "The latest pieces.",
    tone: "tone-a",
    filter: "new",
  },
  {
    title: "Everyday Essentials",
    eyebrow: "REFINED BASICS",
    description: "Quiet staples.",
    tone: "tone-b",
    filter: "essentials",
  },
  {
    title: "Outerwear",
    eyebrow: "LAYERED FORM",
    description: "Built for layering.",
    tone: "tone-c",
    filter: "outerwear",
  },
  {
    title: "Accessories",
    eyebrow: "FINAL DETAILS",
    description: "The finishing touch.",
    tone: "tone-d",
    filter: "accessories",
  },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function matchesFilter(
  product: Product,
  filter: CatalogFilter
): boolean {
  if (filter === "all") {
    return true;
  }

  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  const collection = product.collection.toLowerCase();

  if (filter === "new") {
    return Boolean(product.newArrival);
  }

  if (filter === "outerwear") {
    return (
      collection.includes("outerwear") ||
      category.includes("outerwear") ||
      name.includes("jacket") ||
      name.includes("overshirt")
    );
  }

  if (filter === "accessories") {
    return (
      collection.includes("accessor") ||
      category.includes("accessor") ||
      name.includes("tote") ||
      category.includes("canvas")
    );
  }

  return (
    collection.includes("everyday essentials") ||
    collection.includes("new arrivals") ||
    (!matchesFilter(product, "outerwear") &&
      !matchesFilter(product, "accessories"))
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function HeartIcon({
  filled = false,
}: {
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M20.8 8.8c0 5.5-8.8 10.5-8.8 10.5S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 8.8 2.4Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M6.5 8.5h11l1 11h-13l1-11Z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.4 3.2-5 7-5s6.2 1.6 7 5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function LiquidGlass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`liquid-glass ${className}`}>
      {children}
    </div>
  );
}

function MagneticButton({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const handleMove = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    event.currentTarget.style.setProperty(
      "--mag-x",
      `${Math.max(
        -8,
        Math.min(8, x / 7)
      )}px`
    );

    event.currentTarget.style.setProperty(
      "--mag-y",
      `${Math.max(
        -6,
        Math.min(6, y / 7)
      )}px`
    );
  };

  const handleLeave = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.currentTarget.style.setProperty(
      "--mag-x",
      "0px"
    );

    event.currentTarget.style.setProperty(
      "--mag-y",
      "0px"
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic-button ${className}`}
    >
      {children}
    </button>
  );
}

function ProductVisual({
  product,
}: {
  product: Product;
}) {
  const [imageFailed, setImageFailed] =
    useState(false);

  return (
    <div className="product-visual">
      {!imageFailed ? (
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="product-real-image"
          priority={Boolean(product.featured)}
          onError={() =>
            setImageFailed(true)
          }
        />
      ) : (
        <div
          className="product-image-fallback"
          aria-label="Product image unavailable"
        >
          <span>
            {product.category}
          </span>

          <strong>
            {product.name}
          </strong>
        </div>
      )}

      <div
        className="product-image-glass"
        aria-hidden="true"
      />

      <div
        className="product-image-water"
        aria-hidden="true"
      />

      <div
        className="product-image-vignette"
        aria-hidden="true"
      />
    </div>
  );
}

function ProductCard({
  product,
  wished,
  onWishlist,
  onAdd,
}: {
  product: Product;
  wished: boolean;
  onWishlist: () => void;
  onAdd: () => void;
}) {
  const discount =
    product.compareAtPrice &&
    product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice -
            product.price) /
            product.compareAtPrice) *
            100
        )
      : 0;

  return (
    <article className="product-card reveal">
      <div className="product-image-shell">
        {product.badge ? (
          <span className="product-badge">
            {product.badge}
          </span>
        ) : null}

        {discount > 0 ? (
          <span className="product-discount-badge">
            -{discount}%
          </span>
        ) : null}

        <button
          type="button"
          aria-label={
            wished
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          onClick={onWishlist}
          className={`product-wishlist ${
            wished ? "is-wished" : ""
          }`}
          aria-pressed={wished}
        >
          <HeartIcon filled={wished} />
        </button>

        <Link
          href={`/products/${product.slug}`}
          className="product-card-media-link"
          aria-label={`View ${product.name}`}
        >
          <ProductVisual product={product} />
        </Link>

        <div className="product-image-bottom">
          <span>
            <Link
              href={`/products/${product.slug}`}
              className="product-view-link"
              aria-label={`View ${product.name}`}
            >
              VIEW PRODUCT
            </Link>
          </span>

          <button
            type="button"
            onClick={onAdd}
            className="quick-add"
            aria-label={`Quick add ${product.name} to bag`}
            disabled={product.stock <= 0}
          >
            <BagIcon />
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-meta-row">
          <p>{product.category}</p>

          {product.stock <= 10 ? (
            <span className="stock-note">
              {product.stock > 0
                ? `Only ${product.stock} left`
                : "Out of stock"}
            </span>
          ) : null}
        </div>

        <h3>
          <Link
            href={`/products/${product.slug}`}
            className="product-title-link"
          >
            {product.name}
          </Link>
        </h3>

        <div className="product-price-row">
          <span>
            {formatPrice(product.price)}
          </span>

          {product.compareAtPrice ? (
            <del>
              {formatPrice(
                product.compareAtPrice
              )}
            </del>
          ) : null}
        </div>

        <div className="product-bottom-meta">
          <span className="product-rating">
            ★ {product.rating.toFixed(1)}{" "}
            <small>
              ({product.reviewCount})
            </small>
          </span>

          <span
            className="product-swatches"
            aria-label="Available colors"
          >
            {product.colors
              .slice(0, 3)
              .map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  style={{
                    backgroundColor:
                      color.hex,
                  }}
                />
              ))}
          </span>
        </div>
      </div>
    </article>
  );
}

function normalizeCart(
  value: unknown
): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (
      !entry ||
      typeof entry !== "object"
    ) {
      return [];
    }

    const item =
      entry as Partial<CartItem>;

    if (
      typeof item.id !== "string" ||
      typeof item.slug !== "string" ||
      typeof item.name !== "string" ||
      typeof item.price !== "number"
    ) {
      return [];
    }

    return [
      {
        id: item.id,
        slug: item.slug,
        name: item.name,
        category:
          typeof item.category ===
          "string"
            ? item.category
            : "Fashion",
        price: item.price,
        thumbnail:
          typeof item.thumbnail ===
          "string"
            ? item.thumbnail
            : "",
        size:
          typeof item.size ===
          "string"
            ? item.size
            : "",
        color:
          typeof item.color ===
          "string"
            ? item.color
            : "",
        quantity: Math.max(
          1,
          Number(item.quantity) || 1
        ),
      },
    ];
  });
}

export default function Home() {
  const router = useRouter();

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [cartOpen, setCartOpen] =
    useState(false);

  const [wishlistOpen, setWishlistOpen] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [wishlist, setWishlist] =
    useState<string[]>([]);

  const [search, setSearch] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState<CatalogFilter>("new");

  const [email, setEmail] =
    useState("");

  const [newsletterDone, setNewsletterDone] =
    useState(false);

  useEffect(() => {
    try {
      const savedCart =
        JSON.parse(
          localStorage.getItem(
            CART_KEY
          ) || "[]"
        );

      setCart(
        normalizeCart(savedCart)
      );

      const savedWishlist =
        JSON.parse(
          localStorage.getItem(
            WISHLIST_KEY
          ) || "[]"
        );

      setWishlist(
        Array.isArray(
          savedWishlist
        )
          ? savedWishlist.filter(
              (
                id
              ): id is string =>
                typeof id ===
                "string"
            )
          : []
      );

      const savedEmail =
        localStorage.getItem(
          NEWSLETTER_KEY
        );

      if (savedEmail) {
        setEmail(savedEmail);
        setNewsletterDone(true);
      }
    } catch {
      setCart([]);
      setWishlist([]);
    }
  }, []);

  useEffect(() => {
    const handleCartEvent = (
      event: Event
    ) => {
      setCart(
        normalizeCart(
          (event as CustomEvent)
            .detail
        )
      );
    };

    const handleWishlistEvent = (
      event: Event
    ) => {
      const value =
        (event as CustomEvent).detail;

      if (Array.isArray(value)) {
        setWishlist(
          value.filter(
            (
              id
            ): id is string =>
              typeof id ===
              "string"
          )
        );
      }
    };

    window.addEventListener(
      "atelier:cart",
      handleCartEvent
    );

    window.addEventListener(
      "atelier:wishlist",
      handleWishlistEvent
    );

    return () => {
      window.removeEventListener(
        "atelier:cart",
        handleCartEvent
      );

      window.removeEventListener(
        "atelier:wishlist",
        handleWishlistEvent
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
        setWishlistOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  useEffect(() => {
    const shouldLock =
      searchOpen ||
      cartOpen ||
      wishlistOpen ||
      mobileMenuOpen;

    document.body.style.overflow =
      shouldLock ? "hidden" : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    searchOpen,
    cartOpen,
    wishlistOpen,
    mobileMenuOpen,
  ]);

  useEffect(() => {
    const handlePointer = (
      event: PointerEvent
    ) => {
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${event.clientX}px`
      );

      document.documentElement.style.setProperty(
        "--cursor-y",
        `${event.clientY}px`
      );

      document.documentElement.style.setProperty(
        "--cursor-x-percent",
        `${
          (event.clientX /
            window.innerWidth) *
          100
        }%`
      );

      document.documentElement.style.setProperty(
        "--cursor-y-percent",
        `${
          (event.clientY /
            window.innerHeight) *
          100
        }%`
      );
    };

    window.addEventListener(
      "pointermove",
      handlePointer
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointer
      );
    };
  }, []);

  useEffect(() => {
    const elements =
      document.querySelectorAll(
        ".reveal"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "is-visible"
                );

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.12,
        }
      );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () =>
      observer.disconnect();
  }, [
    activeFilter,
    search,
  ]);

  const searchResults =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return products;
      }

      return products.filter(
        (product) =>
          [
            product.name,
            product.category,
            product.collection,
            product.description,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query)
      );
    }, [search]);

  const filteredProducts =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return products.filter(
        (product) => {
          const matchesCatalog =
            matchesFilter(
              product,
              activeFilter
            );

          if (!matchesCatalog) {
            return false;
          }

          if (!query) {
            return true;
          }

          return [
            product.name,
            product.category,
            product.collection,
            product.description,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query);
        }
      );
    }, [
      activeFilter,
      search,
    ]);

  const wishlistProducts =
    useMemo(
      () =>
        products.filter(
          (product) =>
            wishlist.includes(
              product.id
            )
        ),
      [wishlist]
    );

  const cartCount =
    useMemo(
      () =>
        cart.reduce(
          (total, item) =>
            total +
            item.quantity,
          0
        ),
      [cart]
    );

  const cartTotal =
    useMemo(
      () =>
        cart.reduce(
          (total, item) =>
            total +
            item.price *
              item.quantity,
          0
        ),
      [cart]
    );

  const scrollToShop = () => {
    window.requestAnimationFrame(
      () => {
        document
          .getElementById("shop")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }
    );
  };

  const goToShop = () => {
    setActiveFilter("all");
    setSearch("");
    setSearchOpen(false);
    setWishlistOpen(false);
    setMobileMenuOpen(false);
    scrollToShop();
  };

  const selectFilter = (
    filter: CatalogFilter
  ) => {
    setActiveFilter(filter);
    setSearch("");
    setSearchOpen(false);
    setWishlistOpen(false);
    setMobileMenuOpen(false);
    scrollToShop();
  };

  const saveCart = (
    next: CartItem[]
  ) => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(next)
    );

    window.dispatchEvent(
      new CustomEvent(
        "atelier:cart",
        {
          detail: next,
        }
      )
    );
  };

  const addToCart = (
    product: Product
  ) => {
    if (product.stock <= 0) {
      return;
    }

    const size =
      product.sizes[0] ?? "";

    const color =
      product.colors[0]?.name ??
      "";

    const existingIndex =
      cart.findIndex(
        (item) =>
          item.id ===
            product.id &&
          item.size === size &&
          item.color === color
      );

    const maxQuantity =
      Math.min(
        product.stock,
        10
      );

    let next: CartItem[];

    if (existingIndex >= 0) {
      next = cart.map(
        (item, index) =>
          index ===
          existingIndex
            ? {
                ...item,
                quantity:
                  Math.min(
                    item.quantity +
                      1,
                    maxQuantity
                  ),
              }
            : item
      );
    } else {
      next = [
        ...cart,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          category:
            product.category,
          price: product.price,
          thumbnail:
            product.thumbnail,
          size,
          color,
          quantity: 1,
        },
      ];
    }

    saveCart(next);
    setCart(next);
    setCartOpen(true);
  };

  const changeQuantity = (
    index: number,
    delta: number
  ) => {
    const next =
      cart
        .map(
          (item, itemIndex) => {
            if (
              itemIndex !== index
            ) {
              return item;
            }

            const product =
              products.find(
                (candidate) =>
                  candidate.id ===
                  item.id
              );

            const max =
              product
                ? Math.min(
                    product.stock,
                    10
                  )
                : 10;

            return {
              ...item,
              quantity:
                Math.max(
                  0,
                  Math.min(
                    max,
                    item.quantity +
                      delta
                  )
                ),
            };
          }
        )
        .filter(
          (item) =>
            item.quantity > 0
        );

    saveCart(next);
    setCart(next);
  };

  const removeFromCart = (
    index: number
  ) => {
    const next =
      cart.filter(
        (_, itemIndex) =>
          itemIndex !== index
      );

    saveCart(next);
    setCart(next);
  };

  const toggleWishlist = (
    id: string
  ) => {
    const next =
      wishlist.includes(id)
        ? wishlist.filter(
            (item) =>
              item !== id
          )
        : [...wishlist, id];

    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify(next)
    );

    window.dispatchEvent(
      new CustomEvent(
        "atelier:wishlist",
        {
          detail: next,
        }
      )
    );

    setWishlist(next);
  };

  const submitNewsletter = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value =
      email.trim();

    if (!value) {
      return;
    }

    localStorage.setItem(
      NEWSLETTER_KEY,
      value
    );

    setNewsletterDone(true);
  };

  return (
    <main>
      <div
        className="cursor-water"
        aria-hidden="true"
      />

      <div
        className="cursor-water-glow"
        aria-hidden="true"
      />

      <div
        className="scroll-progress"
        aria-hidden="true"
      />

      <header className="site-header">
        <div className="header-inner">
          <Link
            href="/"
            className="brand"
            aria-label="A Atelier home"
          >
            <span className="brand-mark">
              A
            </span>

            <span className="brand-name">
              ATELIER
            </span>
          </Link>

          <nav
            className="desktop-nav"
            aria-label="Primary navigation"
          >
            <a
              href="#new"
              onClick={(event) => {
                event.preventDefault();
                selectFilter("new");
              }}
            >
              New In
            </a>

            <a
              href="#shop"
              onClick={(event) => {
                event.preventDefault();
                goToShop();
              }}
            >
              Shop
            </a>

            <a href="#collections">
              Collections
            </a>

            <a href="#editorial">
              Editorial
            </a>

            <a href="#sale">
              Sale
            </a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              aria-label="Search"
              onClick={() =>
                setSearchOpen(true)
              }
            >
              <SearchIcon />
            </button>

            <button
              type="button"
              className="icon-button desktop-only"
              aria-label="Wishlist"
              onClick={() =>
                setWishlistOpen(
                  true
                )
              }
            >
              <HeartIcon />

              {wishlist.length >
              0 ? (
                <span className="mini-count">
                  {wishlist.length}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className="icon-button"
              aria-label="Shopping bag"
              onClick={() =>
                setCartOpen(true)
              }
            >
              <BagIcon />

              {cartCount > 0 ? (
                <span className="mini-count">
                  {cartCount}
                </span>
              ) : null}
            </button>

            <Link
              href="/account"
              className="account-button desktop-only"
            >
              <UserIcon />

              <span>
                Account
              </span>
            </Link>

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() =>
                setMobileMenuOpen(
                  (value) => !value
                )
              }
              aria-label={
                mobileMenuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={
                mobileMenuOpen
              }
            >
              {mobileMenuOpen ? (
                <CloseIcon />
              ) : (
                <MenuIcon />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <LiquidGlass className="mobile-menu">
            <a
              href="#new"
              onClick={(event) => {
                event.preventDefault();
                selectFilter("new");
              }}
            >
              New In
            </a>

            <a
              href="#shop"
              onClick={(event) => {
                event.preventDefault();
                goToShop();
              }}
            >
              Shop
            </a>

            <a
              href="#collections"
              onClick={() =>
                setMobileMenuOpen(
                  false
                )
              }
            >
              Collections
            </a>

            <a
              href="#editorial"
              onClick={() =>
                setMobileMenuOpen(
                  false
                )
              }
            >
              Editorial
            </a>

            <a
              href="#sale"
              onClick={() =>
                setMobileMenuOpen(
                  false
                )
              }
            >
              Sale
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(
                  false
                );

                setWishlistOpen(
                  true
                );
              }}
            >
              Wishlist

              {wishlist.length >
              0
                ? ` (${wishlist.length})`
                : ""}
            </button>
          </LiquidGlass>
        ) : null}
      </header>

      <section className="hero-section">
        <div className="hero-shell reveal">
          <div
            className="hero-water water-layer-one"
            aria-hidden="true"
          />

          <div
            className="hero-water water-layer-two"
            aria-hidden="true"
          />

          <div
            className="hero-glass-shine"
            aria-hidden="true"
          />

          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow">
                SPRING / SUMMER 2026
              </p>

              <h1>
                Quietly
                <br />
                <em>
                  iconic.
                </em>
              </h1>

              <p className="hero-description">
                Modern essentials shaped
                around comfort, proportion
                and effortless everyday wear.
              </p>

              <div className="hero-actions">
                <MagneticButton
                  className="primary-button"
                  onClick={goToShop}
                >
                  <span>
                    Explore collection
                  </span>

                  <ArrowIcon />
                </MagneticButton>

                <a
                  href="#new"
                  className="secondary-button"
                  onClick={() => {
                    setActiveFilter(
                      "new"
                    );
                  }}
                >
                  Shop new in
                </a>
              </div>

              <div className="hero-meta">
                <span>
                  Premium fabrics
                </span>

                <span>
                  Free shipping over ₹1,999
                </span>

                <span>
                  Easy returns
                </span>
              </div>
            </div>

            <LiquidGlass className="hero-edit">
              <span>
                EDIT 01
              </span>

              <strong>
                The Soft Structure
              </strong>
            </LiquidGlass>
          </div>
        </div>
      </section>

      <section
        id="collections"
        className="section-shell"
      >
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">
              DISCOVER
            </p>

            <h2>
              Shop by collection
            </h2>
          </div>

          <button
            type="button"
            className="text-link"
            onClick={goToShop}
          >
            <span>
              View all
            </span>

            <ArrowIcon />
          </button>
        </div>

        <div className="collection-grid">
          {categories.map(
            (
              category,
              index
            ) => (
              <button
                key={category.title}
                type="button"
                className={`collection-card reveal ${category.tone}`}
                onClick={() =>
                  selectFilter(
                    category.filter
                  )
                }
                style={{
                  animationDelay:
                    `${index * 80}ms`,
                }}
              >
                <div className="collection-water" />

                <span className="collection-number">
                  0
                  {index + 1}
                </span>

                <div className="collection-bottom">
                  <div>
                    <p>
                      {category.eyebrow}
                    </p>

                    <h3>
                      {category.title}
                    </h3>

                    <span>
                      {category.description}
                    </span>
                  </div>

                  <span className="round-arrow">
                    <ArrowIcon />
                  </span>
                </div>
              </button>
            )
          )}
        </div>
      </section>

      <section
        id="new"
        className="section-shell"
      >
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">
              THE LATEST
            </p>

            <h2>
              {activeFilter ===
                "all" ||
              activeFilter ===
                "new"
                ? "New arrivals"
                : activeFilter ===
                    "essentials"
                  ? "Everyday essentials"
                  : activeFilter ===
                      "outerwear"
                    ? "Outerwear"
                    : "Accessories"}
            </h2>
          </div>

          <button
            type="button"
            className="text-link"
            onClick={goToShop}
          >
            <span>
              Explore all
            </span>

            <ArrowIcon />
          </button>
        </div>

        <div
          className="catalog-filter-bar"
          aria-label="Product categories"
        >
          {([
            ["all", "All pieces"],
            ["new", "New arrivals"],
            [
              "essentials",
              "Essentials",
            ],
            [
              "outerwear",
              "Outerwear",
            ],
            [
              "accessories",
              "Accessories",
            ],
          ] as const).map(
            ([filter, label]) => (
              <button
                key={filter}
                type="button"
                className={`catalog-filter-button ${
                  activeFilter ===
                  filter
                    ? "is-active"
                    : ""
                }`}
                onClick={() =>
                  selectFilter(
                    filter
                  )
                }
                aria-pressed={
                  activeFilter ===
                  filter
                }
              >
                {label}
              </button>
            )
          )}
        </div>

        <div
          id="shop"
          className="product-grid"
        >
          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={
                  product.id
                }
                product={
                  product
                }
                wished={wishlist.includes(
                  product.id
                )}
                onWishlist={() =>
                  toggleWishlist(
                    product.id
                  )
                }
                onAdd={() =>
                  addToCart(
                    product
                  )
                }
              />
            )
          )}
        </div>

        {filteredProducts.length ===
        0 ? (
          <div className="empty-state reveal is-visible">
            <h3>
              No products found.
            </h3>

            <p>
              Try another search.
            </p>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setSearch("");
                setActiveFilter(
                  "all"
                );
              }}
            >
              Clear search
            </button>
          </div>
        ) : null}
      </section>

      <section
        id="editorial"
        className="section-shell"
      >
        <div className="editorial-shell reveal">
          <div className="editorial-water" />

          <div className="editorial-copy">
            <p className="eyebrow">
              EDITORIAL / 01
            </p>

            <h2>
              Designed for the
              <br />
              <em>
                in-between moments.
              </em>
            </h2>
          </div>

          <div className="editorial-side">
            <p>
              A softer approach to
              everyday dressing. Natural
              texture, relaxed silhouettes
              and considered details come
              together in pieces built to
              move with you.
            </p>

            <a
              href="#shop"
              className="editorial-button"
            >
              <span>
                Read the story
              </span>

              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <LiquidGlass className="benefits-grid reveal">
          <div className="benefit">
            <span>
              01
            </span>

            <div>
              <h3>
                Premium materials
              </h3>

              <p>
                Thoughtful fabrics chosen
                for comfort and longevity.
              </p>
            </div>
          </div>

          <div className="benefit">
            <span>
              02
            </span>

            <div>
              <h3>
                Easy returns
              </h3>

              <p>
                A simple,
                customer-friendly return
                experience.
              </p>
            </div>
          </div>

          <div className="benefit">
            <span>
              03
            </span>

            <div>
              <h3>
                Secure checkout
              </h3>

              <p>
                Protected payments and a
                smooth checkout journey.
              </p>
            </div>
          </div>
        </LiquidGlass>
      </section>

      <section
        id="sale"
        className="newsletter-section section-shell"
      >
        <div className="newsletter-inner reveal">
          <p className="eyebrow">
            STAY IN THE LOOP
          </p>

          <h2>
            First access to new drops.
          </h2>

          <p>
            Join the list for new
            collections, early access and
            considered offers.
          </p>

          {!newsletterDone ? (
            <form
              className="newsletter-form"
              onSubmit={
                submitNewsletter
              }
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="Your email address"
                aria-label="Your email address"
              />

              <MagneticButton className="primary-button">
                <span>
                  Subscribe
                </span>

                <ArrowIcon />
              </MagneticButton>
            </form>
          ) : (
            <div
              className="newsletter-success"
              role="status"
            >
              <CheckIcon />

              <span>
                You&apos;re on the list.
              </span>
            </div>
          )}
        </div>
      </section>

      <footer className="footer-shell section-shell">
        <LiquidGlass className="footer-card">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-mark">
                <span className="brand-mark">
                  A
                </span>

                <span className="brand-name">
                  ATELIER
                </span>
              </div>

              <p>
                A modern clothing label
                focused on quiet design,
                everyday comfort and lasting
                pieces.
              </p>
            </div>

            <div className="footer-column">
              <p className="footer-label">
                SHOP
              </p>

              <a
                href="#new"
                onClick={(event) => {
                  event.preventDefault();
                  selectFilter("new");
                }}
              >
                New In
              </a>

              <a
                href="#shop"
                onClick={(event) => {
                  event.preventDefault();
                  goToShop();
                }}
              >
                Best Sellers
              </a>

              <a href="#sale">
                Sale
              </a>
            </div>

            <div className="footer-column">
              <p className="footer-label">
                DISCOVER
              </p>

              <a href="#collections">
                Collections
              </a>

              <a href="#editorial">
                Editorial
              </a>

              <button
                type="button"
                onClick={() =>
                  setWishlistOpen(
                    true
                  )
                }
              >
                Wishlist
              </button>
            </div>

            <div className="footer-column">
              <p className="footer-label">
                ACCOUNT
              </p>

              <Link href="/account">
                Account
              </Link>

              <button
                type="button"
                onClick={() =>
                  setCartOpen(true)
                }
              >
                Your Bag
              </button>

              <button
                type="button"
                onClick={() =>
                  setSearchOpen(
                    true
                  )
                }
              >
                Search
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © 2026 ATELIER. All rights
              reserved.
            </span>

            <span>
              Crafted for everyday movement.
            </span>
          </div>
        </LiquidGlass>
      </footer>

      {searchOpen ? (
        <div className="overlay-layer">
          <button
            type="button"
            className="overlay-backdrop"
            onClick={() =>
              setSearchOpen(
                false
              )
            }
            aria-label="Close search"
          />

          <LiquidGlass className="search-panel">
            <div className="overlay-header">
              <div>
                <p className="eyebrow">
                  SEARCH
                </p>

                <h2>
                  Find your piece.
                </h2>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() =>
                  setSearchOpen(
                    false
                  )
                }
                aria-label="Close search"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="search-input-wrap">
              <SearchIcon />

              <input
                autoFocus
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search products, categories or collections..."
                aria-label="Search products"
              />
            </div>

            <div className="search-results">
              {searchResults
                .slice(0, 8)
                .map(
                  (product) => (
                    <button
                      type="button"
                      key={
                        product.id
                      }
                      className="search-result"
                      onClick={() => {
                        setSearchOpen(
                          false
                        );

                        router.push(
                          `/products/${product.slug}`
                        );
                      }}
                    >
                      <div>
                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          {product.category}
                        </span>
                      </div>

                      <span>
                        {formatPrice(
                          product.price
                        )}
                      </span>
                    </button>
                  )
                )}
            </div>

            {searchResults.length ===
            0 ? (
              <div className="search-empty">
                No matching products.
              </div>
            ) : null}
          </LiquidGlass>
        </div>
      ) : null}

      {wishlistOpen ? (
        <div className="overlay-layer cart-layer">
          <button
            type="button"
            className="overlay-backdrop"
            onClick={() =>
              setWishlistOpen(
                false
              )
            }
            aria-label="Close wishlist"
          />

          <aside className="cart-drawer wishlist-drawer">
            <div className="cart-header">
              <div>
                <p className="eyebrow">
                  WISHLIST
                </p>

                <h2>
                  {
                    wishlistProducts.length
                  }{" "}
                  {
                    wishlistProducts.length ===
                    1
                      ? "piece"
                      : "pieces"
                  }
                </h2>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() =>
                  setWishlistOpen(
                    false
                  )
                }
                aria-label="Close wishlist"
              >
                <CloseIcon />
              </button>
            </div>

            {wishlistProducts.length ===
            0 ? (
              <div className="cart-empty">
                <div className="empty-bag-icon">
                  <HeartIcon />
                </div>

                <h3>
                  Your wishlist is empty.
                </h3>

                <p>
                  Save pieces you want to
                  come back to later.
                </p>

                <button
                  type="button"
                  className="primary-button inline-button"
                  onClick={() => {
                    setWishlistOpen(
                      false
                    );

                    goToShop();
                  }}
                >
                  <span>
                    Explore products
                  </span>

                  <ArrowIcon />
                </button>
              </div>
            ) : (
              <div className="cart-items">
                {wishlistProducts.map(
                  (product) => (
                    <div
                      className="cart-item"
                      key={
                        product.id
                      }
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="cart-thumbnail"
                        onClick={() =>
                          setWishlistOpen(
                            false
                          )
                        }
                      >
                        <ProductVisual
                          product={
                            product
                          }
                        />
                      </Link>

                      <div className="cart-item-info">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() =>
                            setWishlistOpen(
                              false
                            )
                          }
                        >
                          <strong>
                            {
                              product.name
                            }
                          </strong>
                        </Link>

                        <span>
                          {
                            product.category
                          }
                        </span>

                        <b>
                          {formatPrice(
                            product.price
                          )}
                        </b>

                        <button
                          type="button"
                          className="wishlist-add-button"
                          onClick={() => {
                            addToCart(
                              product
                            );

                            setWishlistOpen(
                              false
                            );
                          }}
                        >
                          Add to Bag
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-item"
                        onClick={() =>
                          toggleWishlist(
                            product.id
                          )
                        }
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </aside>
        </div>
      ) : null}

      {cartOpen ? (
        <div className="overlay-layer cart-layer">
          <button
            type="button"
            className="overlay-backdrop"
            onClick={() =>
              setCartOpen(false)
            }
            aria-label="Close cart"
          />

          <aside className="cart-drawer">
            <div className="cart-header">
              <div>
                <p className="eyebrow">
                  YOUR BAG
                </p>

                <h2>
                  {cartCount}{" "}
                  {
                    cartCount === 1
                      ? "item"
                      : "items"
                  }
                </h2>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() =>
                  setCartOpen(false)
                }
                aria-label="Close bag"
              >
                <CloseIcon />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <div className="empty-bag-icon">
                  <BagIcon />
                </div>

                <h3>
                  Your bag is empty.
                </h3>

                <p>
                  Add something beautiful
                  to get started.
                </p>

                <button
                  type="button"
                  className="primary-button inline-button"
                  onClick={() => {
                    setCartOpen(
                      false
                    );

                    goToShop();
                  }}
                >
                  <span>
                    Shop new in
                  </span>

                  <ArrowIcon />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        className="cart-item"
                        key={`${item.id}-${item.size}-${item.color}`}
                      >
                        <Link
                          href={`/products/${item.slug}`}
                          className="cart-thumbnail"
                          onClick={() =>
                            setCartOpen(
                              false
                            )
                          }
                        >
                          <Image
                            src={
                              item.thumbnail
                            }
                            alt={
                              item.name
                            }
                            fill
                            sizes="96px"
                            className="cart-item-image"
                          />
                        </Link>

                        <div className="cart-item-info">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={() =>
                              setCartOpen(
                                false
                              )
                            }
                          >
                            <strong>
                              {
                                item.name
                              }
                            </strong>
                          </Link>

                          <span>
                            {item.size
                              ? `Size ${item.size}`
                              : "Standard"}
                          </span>

                          <span>
                            {item.color}
                          </span>

                          <b>
                            {formatPrice(
                              item.price *
                                item.quantity
                            )}
                          </b>

                          <div className="cart-line-controls">
                            <div className="cart-quantity-controls">
                              <button
                                type="button"
                                onClick={() =>
                                  changeQuantity(
                                    index,
                                    -1
                                  )
                                }
                                aria-label="Decrease quantity"
                              >
                                <MinusIcon />
                              </button>

                              <span>
                                {
                                  item.quantity
                                }
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  changeQuantity(
                                    index,
                                    1
                                  )
                                }
                                aria-label="Increase quantity"
                              >
                                <PlusIcon />
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="remove-item"
                          onClick={() =>
                            removeFromCart(
                              index
                            )
                          }
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    )
                  )}
                </div>

                <div className="cart-footer">
                  <div className="cart-summary-row">
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      {formatPrice(
                        cartTotal
                      )}
                    </strong>
                  </div>

                  <p className="cart-note">
                    Shipping and taxes
                    calculated at
                    checkout.
                  </p>

                  <Link
                    href="/checkout"
                    className="checkout-button"
                    onClick={() =>
                      setCartOpen(
                        false
                      )
                    }
                  >
                    <span>
                      Proceed to
                      checkout
                    </span>

                    <ArrowIcon />
                  </Link>
                </div>
              </>
            )}
          </aside>
        </div>
      ) : null}

      <div className="assist-bubble">
        <CheckIcon />
      </div>
    </main>
  );
}