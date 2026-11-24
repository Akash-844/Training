import Link from "next/link";
import Image from "next/image";
import Icon from "../../public/icon.svg";

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Licensing", href: "/licensing" },
  { name: "Contact", href: "/contact" }
];

const Footer = () => {
  return (
    <footer className="w-full bg-(--foreground) text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="PriceMarket Home"
          >
            <Image
              src={Icon}
              alt="PriceMarket Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />

            <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Price<span className="text-yellow-500">Market</span>
            </span>
          </Link>

          {/* Footer Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-gray-300 sm:gap-x-8">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-yellow-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="my-6 border-gray-700 md:my-8" />

        <p className="text-center text-xs text-gray-400 sm:text-sm">
          &copy; 2026{" "}
          <Link
            href="/"
            className="font-semibold text-white transition hover:text-yellow-400"
          >
            PriceMarket™
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
