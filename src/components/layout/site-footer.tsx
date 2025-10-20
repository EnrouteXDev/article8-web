import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-white px-6 py-16 sm:px-16">
      <div className="mx-auto grid w-full max-w-7xl gap-12 text-black sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Our Story</h3>
          <Link href="#" className="transition-colors hover:text-brand">
            Blog / Insights
          </Link>
          <Link href="#" className="transition-colors hover:text-brand">
            Animated Production
          </Link>
          <Link href="#" className="transition-colors hover:text-brand">
            Capacity Building & Training
          </Link>
          <Link href="#behind-the-scenes" className="transition-colors hover:text-brand">
            Behind the Scenes
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Events</h3>
          <Link href="#" className="transition-colors hover:text-brand">
            Client Testimonials
          </Link>
          <Link href="#" className="transition-colors hover:text-brand">
            Awards & Recognition
          </Link>
          <Link href="#" className="transition-colors hover:text-brand">
            Workshops & Masterclasses
          </Link>
          <Link href="#" className="transition-colors hover:text-brand">
            Upcoming Events
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Contact Us</h3>
          <address className="not-italic leading-relaxed">
            F3B4, Lagos HOMS Estate,
            <br />
            Olu Aina Street, Mushin,
            <br />
            Lagos
          </address>
          <a href="tel:+2348027161206" className="transition-colors hover:text-brand">
            +234 802 716 1206
          </a>
          <a href="tel:+2349025999661" className="transition-colors hover:text-brand">
            +234 902 599 9661
          </a>
          <a href="mailto:info@Article8.media" className="transition-colors hover:text-brand">
            info@Article8.media
          </a>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold">FAQ&apos;S</h3>
          <div className="flex items-center gap-4 text-gray-600">
            <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href={siteConfig.links.facebook} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href={siteConfig.links.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href={siteConfig.links.youtube} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
            {siteConfig.links.x ? (
              <Link href={siteConfig.links.x} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="sr-only">X</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
