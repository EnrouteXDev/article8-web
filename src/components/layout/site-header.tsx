import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

import { siteConfig } from "@/config/site";
import Image from "next/image";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: Linkedin },
  { label: "Facebook", href: siteConfig.links.facebook, Icon: Facebook },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: Instagram },
  { label: "YouTube", href: siteConfig.links.youtube, Icon: Youtube },
].filter((link) => Boolean(link.href));

function XMarkIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#F5F5F5]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-8 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-32">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Article 8 Media Logo" width={185} height={54} />
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {socialLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brand"
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span className="sr-only">{label}</span>
              </Link>
            ))}
            {siteConfig.links.x ? (
              <Link
                href={siteConfig.links.x}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brand"
              >
                <XMarkIcon />
                <span className="sr-only">X</span>
              </Link>
            ) : null}
          </div> 
        </div>
        

        <nav className="flex flex-wrap items-center gap-8 text-sm font-semibold text-brand">
          {siteConfig.navigation.map((item) => (
            <Link key={item.label} href={item.href} className="transition-opacity hover:opacity-80">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
