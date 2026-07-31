export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-center px-6">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Gujarati Digital Library.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}