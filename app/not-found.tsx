"use client";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
        <p className="mt-4">The page you are looking for does not exist.</p>
        <a href="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Go back home
        </a>
      </div>
    </div>
  );
}