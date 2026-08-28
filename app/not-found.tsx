import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-6">
      <p className="text-8xl">🛒</p>
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back to shopping.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
