import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center">
      <Image
        src="/images/logo.png"
        alt="HireLoop Logo"
        width={130}
        height={32}
        priority
        className="h-7 sm:h-8 w-auto object-contain"
      />
    </Link>
  );
}