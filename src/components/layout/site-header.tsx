/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from "next/link"
import Image from "next/image"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Menu, X, Linkedin, Facebook, Instagram, Youtube } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/config/site"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: Linkedin },
  { label: "Facebook", href: siteConfig.links.facebook, Icon: Facebook },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: Instagram },
  { label: "YouTube", href: siteConfig.links.youtube, Icon: Youtube },
].filter(Boolean) as { label: string; href?: string; Icon: React.ComponentType<any> }[]

function usePrefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function SiteHeader(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = usePrefersReducedMotion()
  const menuRef = useRef<HTMLElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null
      // lock scroll
      document.documentElement.style.overflow = "hidden"
      // focus first focusable inside menu after mount
      const timer = setTimeout(() => {
        const el = menuRef.current?.querySelector<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])")
        el?.focus()
      }, 50)
      return () => clearTimeout(timer)
    } else {
      document.documentElement.style.overflow = ""
      previouslyFocused.current?.focus()
    }
  }, [isOpen])

  // keyboard: Escape closes, Tab traps focus
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isOpen) return
      if (e.key === "Escape") {
        setIsOpen(false)
      } else if (e.key === "Tab") {
        // focus trap
        const container = menuRef.current
        if (!container) return
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"),
        ).filter(Boolean)
        if (focusables.length === 0) {
          e.preventDefault()
          return
        }
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const panelVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  }

  const listItemVariants = {
    hidden: { x: 24, opacity: 0 },
    visible: (i: number) => ({ x: 0, opacity: 1, transition: { delay: reduceMotion ? 0 : 0.12 * i } }),
  }

  function SocialLinks({ className = "" }: { className?: string }) {
    return (
      <div className={`flex items-center gap-4 text-sm text-gray-600 ${className}`}>
        {socialLinks.map(({ label, href, Icon }) => (
          <Link
            key={label}
            href={href || "#"}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-sm p-1 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring"
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span className="sr-only">{label}</span>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-[#F5F5F5]">
      <div className="mx-auto w-full max-w-7xl px-4 py-4  md:py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-16">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Article 8 Media Logo" width={185} height={54} />
            </Link>
            <div className="hidden md:block">
              <SocialLinks />
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-brand md:flex">
            {siteConfig.navigation.map((item) => (
              <Link key={item.label} href={item.href} className="transition-opacity hover:opacity-80">
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((s) => !s)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-brand transition-colors hover:text-brand/80 md:hidden"
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            {isOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu portal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Slide panel */}
            <motion.nav
              id="mobile-menu"
              key="panel"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-[420px] bg-white shadow-2xl md:hidden"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <Image src="/logo.svg" alt="Article 8 Media Logo" width={150} height={40} />
                    </Link>
                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Close menu"
                      className="flex h-10 w-10 items-center justify-center rounded-md text-brand transition-colors hover:text-brand/80"
                    >
                      <X className="h-6 w-6" aria-hidden />
                    </button>
                  </div>

                  <div className="p-6">
                    <motion.ul className="flex flex-col gap-6" initial="hidden" animate="visible" role="menu">
                      {siteConfig.navigation.map((item, idx) => (
                        <motion.li key={item.label} custom={idx} variants={listItemVariants}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-2xl font-bold text-brand transform transition hover:translate-x-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring"
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-6">
                  <div className="mb-3 text-sm text-gray-600">Connect</div>
                  <SocialLinks className="justify-start" />
                  <div className="mt-4 text-xs text-gray-400">© {new Date().getFullYear()}</div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default SiteHeader
