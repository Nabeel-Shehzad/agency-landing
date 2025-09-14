import Link from "next/link";

export default function BrandHeader() {
  return (
    <header className="p-4">
      <Link href="/">
        <img
          src="/logo.png"
          alt="Brand Logo"
          className="h-10 w-auto cursor-pointer"
        />
      </Link>
    </header>
  );
}
