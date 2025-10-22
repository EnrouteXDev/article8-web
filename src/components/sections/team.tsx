/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamGroups = [
  {
    label: "Pre-Prod",
    alt: "Storyboard artist reviewing sketches on a wall",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Production",
    alt: "Camera operator filming on a soundstage",
    image:
      "https://images.unsplash.com/photo-1522199994200-7b3f9bca0e1b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Post-Prod",
    alt: "Editor working with animation rigs on a workstation",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Managerial",
    alt: "Creative leads collaborating in a meeting",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function TeamSection() {
  const [active, setActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Refs for DOM nodes
  const rootRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Refs for expanded UI
  const leftImageRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const mobileSheetRef = useRef<HTMLDivElement | null>(null);

  // refs for ScrollTrigger inside panel (member sections)
  const memberSectionRefs = useRef<Array<HTMLElement | null>>([]);

  // GSAP contexts / timelines
  const ctxRef = useRef<any>(null);
  const hoverTweensRef = useRef<any>({});
  const openTimelineRef = useRef<any>(null);
  const mobileTimelineRef = useRef<any>(null);
  const scrollTriggersRef = useRef<any[]>([]);

  // Update isMobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Initialize GSAP context and hover handlers
  useEffect(() => {
    if (!gridRef.current) return;
    // create context for scoping selectors/cleanup
    ctxRef.current = gsap.context(() => {
      // hover tweens: create paused tweens and play/reverse on events
      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        // Overlay element inside card (we assume markup below)
        const overlay = el.querySelector<HTMLElement>(".card-overlay");
        const title = el.querySelector<HTMLElement>(".card-title");

        // Create a hover tween that scales card and reveals overlay + title
        const t = gsap.timeline({ paused: true })
          .to(el, {
            scale: 1.03,
            duration: 0.28,
            ease: "power3.out",
          }, 0)
          .fromTo(
            overlay,
            { yPercent: 30, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.32, ease: "power3.out" },
            0
          )
          .fromTo(
            title,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.32, ease: "power3.out" },
            0.05
          );

        hoverTweensRef.current[i] = t;

        // event listeners (desktop only)
        const enter = () => {
          if (active === null && !isMobile) t.play();
        };
        const leave = () => {
          if (active === null && !isMobile) t.reverse();
        };

        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    }, rootRef);

    // cleanup on unmount
    return () => {
      ctxRef.current?.revert();
      hoverTweensRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, active]);

  // Body scroll lock when active
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    if (active !== null) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = prev;
    }
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [active]);

  // Build open/close timelines when active changes
  useEffect(() => {
    // kill previous timelines/triggers
    openTimelineRef.current?.kill();
    mobileTimelineRef.current?.kill();
    scrollTriggersRef.current.forEach((st) => {
      try {
        st.kill();
      } catch {}
    });
    scrollTriggersRef.current = [];

    if (active === null) {
      // ensure overlay hidden when nothing active
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(leftImageRef.current, { clearProps: "all" });
      gsap.set(rightPanelRef.current, { clearProps: "all" });
      gsap.set(mobileSheetRef.current, { clearProps: "all" });
      // revert any pinned triggers
      ScrollTrigger.getAll().forEach((t) => {
        // keep other triggers intact; we will clean panel-specific triggers below when we create them
      });
      return;
    }

    // Create a context-scoped timeline
    const mm = gsap.matchMedia();

    // Desktop timeline (split view)
    mm.add("(min-width: 641px)", () => {
      // fade & scale down other cards, reveal overlay, and animate open
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onReverseComplete: () => {
          // cleanup any panel scroll triggers on reverse complete
          scrollTriggersRef.current.forEach((st) => {
            try {
              st.kill();
            } catch {}
          });
          scrollTriggersRef.current = [];
        },
      });

      // Background: scale down all non-active cards
      const otherCards = cardRefs.current.filter((_, idx) => idx !== active);
      tl.to(otherCards, {
        scale: 0.95,
        opacity: 0.9,
        duration: 0.35,
        stagger: 0.02,
      }, 0);

      // overlay fade
      tl.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.32,
      }, 0);

      // Left: animate the active card into leftImageRef position
      // We'll morph visually by hiding the original and animating leftImage container from off-screen to left.
      // But to keep layout continuity, we animate leftImage from the clicked card's bounding rect.
      const cardEl = cardRefs.current[active];
      const cardRect = cardEl?.getBoundingClientRect();
      const rootRect = rootRef.current?.getBoundingClientRect();

      // compute initial offset (position the leftImage exactly over the clicked card)
      if (cardRect && leftImageRef.current && rootRect) {
        const startX = cardRect.left - (rootRect.left || 0);
        const startY = cardRect.top - (rootRect.top || 0);
        // set left image starting transform so it snaps visually on top of clicked card
        gsap.set(leftImageRef.current, {
          position: "absolute",
          left: startX,
          top: startY,
          width: cardRect.width,
          height: cardRect.height,
          zIndex: 60,
          transformOrigin: "left center",
        });
      }

      // animate left image to occupy left half
      tl.to(leftImageRef.current, {
        left: 0,
        top: 0,
        width: "50vw",
        height: window.innerHeight,
        duration: 0.6,
        ease: "expo.out",
      }, 0.08);

      // Animate right panel sliding in from right
      // start it off-screen to the right
      gsap.set(rightPanelRef.current, { xPercent: 100, zIndex: 70, position: "absolute", right: 0, top: 0, height: "100vh", width: "50vw" });
      tl.to(rightPanelRef.current, {
        xPercent: 0,
        duration: 0.6,
        ease: "expo.out",
      }, 0.12);

      // Once panel open, initialize scroll triggers for member sections
      tl.call(() => {
        initPanelScrollTriggers();
      }, [], ">+=0");

      openTimelineRef.current = tl;
      return () => {
        tl.kill();
      };
    });

    // Mobile timeline (slide-in overlay with background scale)
    mm.add("(max-width: 640px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onReverseComplete: () => {
          scrollTriggersRef.current.forEach((st) => {
            try {
              st.kill();
            } catch {}
          });
          scrollTriggersRef.current = [];
        },
      });

      // Scale down the entire card grid slightly
      tl.to(cardRefs.current, {
        scale: 0.94,
        duration: 0.35,
        stagger: 0.02,
      }, 0);

      // overlay fade in
      tl.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.3,
      }, 0);

      // position mobileSheet off-screen to right and slide in
      gsap.set(mobileSheetRef.current, { xPercent: 100, zIndex: 80, position: "fixed", right: 0, top: 0, width: "100vw", height: "100vh" });
      tl.to(mobileSheetRef.current, {
        xPercent: 0,
        duration: 0.6,
        ease: "expo.out",
      }, 0.12);

      // after open, initialize scroll triggers inside modal (but mobile variant: simpler reveals)
      tl.call(() => {
        initPanelScrollTriggers(true); // pass mobile flag for lighter triggers
      }, [], ">+=0");

      mobileTimelineRef.current = tl;
      return () => {
        tl.kill();
      };
    });

    // cleanup matchMedia on effect cleanup
    return () => {
      mm.revert();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isMobile]);

  // Initialize scroll triggers for PanelContent member sections
  function initPanelScrollTriggers(mobile = false) {
    // Ensure prior triggers are killed
    scrollTriggersRef.current.forEach((st) => {
      try {
        st.kill();
      } catch {}
    });
    scrollTriggersRef.current = [];

    // If no member refs, nothing to do
    if (!memberSectionRefs.current.length) return;

    // Desktop: create overlapping "scroll over" effect where each section comes above the previous one.
    if (!mobile) {
      // We'll pin the rightPanelRef and animate each section into view with z-index stacking.
      const sections = memberSectionRefs.current.filter(Boolean) as HTMLElement[];

      // set initial styles
      sections.forEach((el, i) => {
        gsap.set(el, { yPercent: 20, opacity: 0, zIndex: 10 + i, position: "relative" });
      });

      // Create a ScrollTrigger timeline for the whole panel; pin the panel while moving through sections
      const totalDuration = sections.length * 0.6; // relative scrub length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rightPanelRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * sections.length}`,
          scrub: 0.6,
          pin: rightPanelRef.current,
          invalidateOnRefresh: true,
        },
      });

      sections.forEach((el, i) => {
        // each section animation: bring into view (translate to 0, opacity 1) and sit above previous (z-index is already higher)
        tl.to(el, {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }, i * 0.6);
        // small hold so next slides above it
      });

      // store trigger so we can kill on close
      scrollTriggersRef.current.push(tl.scrollTrigger);
    } else {
      // Mobile: simpler reveal per section (no pinning / heavy scrubbing)
      const sections = memberSectionRefs.current.filter(Boolean) as HTMLElement[];
      sections.forEach((el) => {
        const st = gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 50%",
            toggleActions: "play none none reverse",
          },
        });
        scrollTriggersRef.current.push(st.scrollTrigger);
      });
    }
  }

  // Click handler to open a card
  function handleOpen(i: number) {
    // if already opening same, ignore
    if (active === i) return;
    setActive(i);
  }

  // Close handler
  function handleClose() {
    // reverse timelines appropriately (matchMedia will revert timelines that have been created)
    // We can reverse existing timeline refs to keep smooth reverse animation
    if (openTimelineRef.current && !isMobile) {
      openTimelineRef.current.reverse();
    }
    if (mobileTimelineRef.current && isMobile) {
      mobileTimelineRef.current.reverse();
    }

    // fallback: if no timeline, just clear active
    setTimeout(() => {
      setActive(null);
    }, 600); // give animations a moment to reverse; match Webflow feel
  }

  // Utility: assign refs for arrays
  const setCardRef = (el: HTMLElement | null, i: number) => {
    cardRefs.current[i] = el;
  };
  const setMemberRef = (el: HTMLElement | null, i: number) => {
    memberSectionRefs.current[i] = el;
  };

  return (
    <section className="bg-gray-50 py-24" id="team" ref={rootRef}>
      {active === null && (
        <h2 className="mb-16 text-center text-5xl font-black uppercase tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Meet the Team
        </h2>
      )}

      {/* GRID */}
      <div className="px-4">
        <div
          ref={gridRef}
          className={[
            "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
            active !== null ? "pointer-events-none" : "",
          ].join(" ")}
        >
          {teamGroups.map((group, i) => {
            return (
              <article
                key={group.label}
                ref={(el) => setCardRef(el, i)}
                className="relative aspect-[361/488] overflow-hidden cursor-pointer rounded-lg transform-gpu"
                onClick={() => handleOpen(i)}
                // touch devices: prevent hover tweens from running; GSAP hover tweens already check isMobile in their event handlers
              >
                <img
                  src={group.image}
                  alt={group.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="card-overlay absolute inset-0 bg-gradient-to-b from-transparent to-black/70 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-center uppercase">
                  <h3 className="card-title text-xl font-semibold text-white tracking-wide">
                    {group.label}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/40 pointer-events-none"
        style={{ display: active !== null ? undefined : "none", opacity: 0 }}
        onClick={() => {
          // clicking backdrop should close on mobile/desktop
          handleClose();
        }}
      />

      {/* EXPANDED UI */}
      {/* We render a fixed container that hosts either left image + right panel (desktop) or mobile full-screen sheet */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Left image (desktop only) */}
        <div
          ref={leftImageRef}
          className="hidden md:block pointer-events-auto"
          aria-hidden
        >
          {/* The image is positioned by GSAP; but include an img so that when we animate it, content is visible */}
          {active !== null && (
            <img
              src={teamGroups[active].image}
              alt={teamGroups[active].alt}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Right panel (desktop) */}
        <aside
          ref={rightPanelRef}
          className="hidden md:block pointer-events-auto"
          aria-hidden={active === null}
        >
          {/* Make it visually similar to your previous PanelContent */}
          {active !== null && (
            <div className="relative ml-auto h-screen w-full sm:w-1/2 overflow-y-auto bg-white shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
                <h3 className="text-2xl font-bold">{teamGroups[active].label}</h3>
                <button
                  onClick={handleClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6 p-8">
                {["About the Team", "Key Responsibilities", "Team Members", "Recent Projects"].map(
                  (h, idx) => (
                    <section
                      key={h}
                      ref={(el) => setMemberRef(el, idx)}
                      className="relative rounded-lg bg-white p-6 shadow-sm"
                      aria-label={h}
                    >
                      <h4 className="mb-3 text-xl font-semibold">{h}</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Replace this with your real content for <strong>{h}</strong>. The animation uses natural
                        spring-like timing for smooth motion.
                      </p>
                    </section>
                  )
                )}

                <div className="pt-10">
                  <button
                    onClick={handleClose}
                    className="w-full rounded-lg bg-black py-3 font-medium text-white hover:bg-black/90 transition-colors"
                  >
                    Close Panel
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Mobile sheet */}
        <div
          ref={mobileSheetRef}
          className="sm:hidden pointer-events-auto"
          aria-hidden={active === null}
        >
          {active !== null && (
            <div className="fixed inset-0 z-50 flex flex-col bg-white">
              <div className="relative h-64 w-full">
                <div className="absolute inset-0">
                  <img
                    src={teamGroups[active].image}
                    alt={teamGroups[active].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white uppercase drop-shadow">
                      {teamGroups[active].label}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto bg-white">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
                  <h3 className="text-lg font-bold">{teamGroups[active].label}</h3>
                  <button
                    onClick={handleClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6 p-6">
                  {["About the Team", "Key Responsibilities", "Team Members", "Recent Projects"].map(
                    (h, idx) => (
                      <section
                        key={h}
                        ref={(el) => setMemberRef(el, idx)}
                        className="rounded-lg bg-white p-4 shadow-sm"
                        aria-label={h}
                      >
                        <h4 className="mb-2 text-lg font-semibold">{h}</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Replace this with your real content for <strong>{h}</strong>. Mobile reveals are lighter for performance.
                        </p>
                      </section>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
