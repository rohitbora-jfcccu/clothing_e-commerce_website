import Link from "next/link";

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

export default function ProductNotFound() {
  return (
    <main className="product-not-found">
      <div className="liquid-glass product-not-found-card">
        <p className="eyebrow">
          A ATELIER
        </p>

        <h1>
          We couldn&apos;t find this piece.
        </h1>

        <p>
          This product is unavailable or the
          link is no longer active.
        </p>

        <Link
          href="/"
          className="primary-button"
        >
          Back to Shop
          <ArrowIcon />
        </Link>
      </div>
    </main>
  );
}