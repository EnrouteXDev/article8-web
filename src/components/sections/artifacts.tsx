"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const artifactSlides = [
  {
    id: "artifact1",
    src: "/artifact1.jpeg",
    alt: "Artifact 1 illustration",
  },
  {
    id: "artifact2",
    src: "/artifact2.jpeg",
    alt: "Artifact 2 illustration",
  },
  {
    id: "artifact3",
    src: "/artifact3.jpeg",
    alt: "Artifact 3 illustration",
  },
  {
    id: "artifact4",
    src: "/artifact4.jpeg",
    alt: "Artifact 4 illustration",
  },
  {
    id: "artifact5",
    src: "/artifact5.jpeg",
    alt: "Artifact 5 illustration",
  },
];

const positions = [
  { x: -160, scale: 0.74, opacity: 0.5, rotateY: 14, blur: "blur(5px)", zIndex: 5 },
  { x: 0, scale: 1, opacity: 1, rotateY: 0, blur: "none", zIndex: 10 },
  { x: 160, scale: 0.74, opacity: 0.5, rotateY: -14, blur: "blur(5px)", zIndex: 5 },
];

export function ArtifactsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearRotationTimeout = useCallback(() => {
    if (rotationTimeoutRef.current) {
      clearTimeout(rotationTimeoutRef.current);
      rotationTimeoutRef.current = null;
    }
  }, []);

  const advance = useCallback(
    (step: number) => {
      if (step === 0) return;
      const normalizedStep = step > 0 ? 1 : -1;
      setDirection(normalizedStep);
      setCurrentIndex((prev) => (prev + normalizedStep + artifactSlides.length) % artifactSlides.length);
    },
    []
  );

  const scheduleNextRotation = useCallback(() => {
    clearRotationTimeout();

    if (isHovered) {
      return;
    }

    rotationTimeoutRef.current = setTimeout(() => {
      advance(1);
    }, 2800);
  }, [advance, clearRotationTimeout, isHovered]);

  useEffect(() => {
    scheduleNextRotation();

    return clearRotationTimeout;
  }, [clearRotationTimeout, currentIndex, scheduleNextRotation]);

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + artifactSlides.length) % artifactSlides.length;
  };

  const promoteSlide = (step: number) => {
    advance(step);
  };

  return (
    <section className="bg-[#F5F5F5] px-6 py-24 sm:px-16 font-display" id="artifacts">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        <h2 className="section-heading text-center text-brand uppercase">
          Artifacts
        </h2>
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div
            className="relative flex h-[400px] w-full items-center justify-center"
            onMouseEnter={() => {
              setIsHovered(true);
              clearRotationTimeout();
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              scheduleNextRotation();
            }}
          >
            <div className="relative flex h-full w-full items-center justify-center" style={{ perspective: "1400px" }}>
              {[-1, 0, 1].map((offset, positionIndex) => {
                const slideIndex = getSlideIndex(offset);
                const slide = artifactSlides[slideIndex];
                const position = positions[positionIndex];

                return (
                  <motion.button
                    key={slide.id}
                    type="button"
                    className="absolute h-[220px] w-[300px] overflow-hidden rounded-3xl shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:h-[260px] sm:w-[360px]"
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: position.zIndex,
                      filter: position.blur,
                      cursor: positionIndex === 1 ? "default" : "pointer",
                    }}
                    onClick={() => positionIndex !== 1 && promoteSlide(offset)}
                    initial={false}
                    animate={{
                      x: position.x,
                      scale: position.scale,
                      opacity: position.opacity,
                      rotateY: position.rotateY,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                    whileHover={
                      positionIndex === 1
                        ? { scale: 1.05 }
                        : {
                            scale: 0.86,
                            rotateY: direction > 0 ? position.rotateY - 4 : position.rotateY + 4,
                          }
                    }
                    onFocus={() => {
                      setIsHovered(true);
                      clearRotationTimeout();
                    }}
                    onBlur={() => {
                      setIsHovered(false);
                      scheduleNextRotation();
                    }}
                  >
                    <div className="relative h-full w-full bg-gradient-to-br from-white/60 via-white/20 to-white/5">
                      <Image src={slide.src} alt={slide.alt} fill className="object-cover" sizes="400px" priority={positionIndex === 1} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-6 text-base leading-relaxed text-brand sm:text-lg">
            <p>
              A growing collection of finished pieces that capture the artistry behind our stories. 
            </p>
            <p>
              Each artifact reflects the craftsmanship, curiosity, and imagination that define every project we create. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
