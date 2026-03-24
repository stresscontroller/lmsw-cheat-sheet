'use client';
import Link from "next/link";

export default function NotFound() {
  return (
    <div data-meta-path="/404" className="min-h-[calc(100vh-350px)] p-10 flex flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6 max-w-md">
        Looks like the page you’re trying to reach doesn’t exist. Let’s get you back on track.
      </p>
      <Link href="/" className="text-blue-600 underline">Go back home</Link>
    </div>
  );
}
