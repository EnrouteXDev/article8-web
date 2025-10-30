"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

const artifactSlides = [
  {
    id: "artifact1",
    name: "Royal Ancestral Scepter",
    src: "/artifact3.jpeg",
    alt: "Royal Ancestral Scepter illustration",
    description:
      "A sacred symbol of authority, the Royal Ancestral Scepter channels the Oba’s command and ancestral power. Forged from black alloy with golden inlays and glowing turquoise energy lines, it responds only to the King’s voice. Embedded with a crystal orb that projects ancestral glyphs, it connects directly to palace defense systems and robotic guardians—able to awaken sentinels, unleash solar bursts, or raise a protective dome around the throne, embodying the unity of tradition, technology, and royal might.",
  },
  {
    id: "artifact2",
    name: "Energy Spear",
    src: "/artifact6.jpeg",
    alt: "Energy Spear illustration",
    description:
      "An elegant fusion of tradition and technology, the Energy Spear serves as both a ceremonial symbol and a formidable weapon. Forged from crystallized light with a bronze-gold alloy shaft, its luminous blade pulses with geometric energy patterns that awaken on command. It channels raw power to slice through metal, release shockwaves, and project a protective energy shield. When driven into the ground, it harnesses seismic vibrations to destabilize enemies—embodying grace, innovation, and unstoppable force.",
  },
  {
    id: "artifact3",
    name: "Long Spear Staff",
    src: "/artifact6.jpeg",
    alt: "Long Spear Staff illustration",
    description:
      "A refined extension of light and precision, the Long Spear Staff channels concentrated blue energy along its length, crackling with controlled voltage. Its form embodies balance—ceremonial in grace yet formidable in combat. Designed for reach and power, each strike radiates pure kinetic energy capable of piercing through advanced alloys with effortless flow.",
  },
  {
    id: "artifact4",
    name: "Energy Scimitar",
    src: "/artifact9.jpeg",
    alt: "Energy Scimitar illustration",
    description:
      "Forged from crystallized light, the Energy Scimitar wields elegance as its edge. Its broad, curved blade shimmers with faint glowing runes that shift as though alive, responding to the wielder’s movement and intent. Every swing releases a whisper of energy through the air—beautiful and deadly, merging artistry with lethal efficiency.",
  },
  {
    id: "artifact5",
    name: "Energy Bow",
    src: "/artifact8.jpeg",
    alt: "Energy Bow illustration",
    description:
      "The Energy Bow embodies precision and discipline. Crafted from luminous arcs bound by crackling energy threads, it draws arrows made of pure light that hum with contained power. Each shot cuts through the air with electrified brilliance, leaving a trail of radiant energy that represents the perfect union of focus and fury.",
  },
  {
    id: "artifact6",
    name: "Energy Whip",
    src: "/artifact6.jpeg",
    alt: "Energy Whip illustration",
    description:
      "A weapon of motion and unpredictability, the Energy Whip is a flowing conduit of luminous power. Composed entirely of light and electricity, it dances through the air with a serpentine rhythm, wrapping and striking with elegance and devastation. Each swing crackles with thunderous energy—a manifestation of control, chaos, and raw force combined.",
  },
  {
    id: "artifact7",
    name: "Energy Shield Gauntlet",
    src: "/artifact1.jpeg",
    alt: "Energy Shield Gauntlet illustration",
    description:
      "A masterpiece of defense and design, the Energy Shield Gauntlet channels focused energy from its core to project a radiant, semi-transparent barrier at the wielder’s command. When activated, arcs of blue light ripple outward, forming a protective field capable of absorbing both kinetic and energy-based impacts. Responsive to motion and intent, the shield adjusts dynamically—expanding to guard allies or condensing into a personal barrier—symbolizing the perfect balance of agility, protection, and power.",
  },
]


const positions = [
  { x: -160, scale: 0.74, opacity: 0.5, rotateY: 14, blur: "blur(5px)", zIndex: 5 },
  { x: 0, scale: 1, opacity: 1, rotateY: 0, blur: "none", zIndex: 10 },
  { x: 160, scale: 0.74, opacity: 0.5, rotateY: -14, blur: "blur(5px)", zIndex: 5 },
]

export function ArtifactsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isHovered, setIsHovered] = useState(false)
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearRotationTimeout = useCallback(() => {
    if (rotationTimeoutRef.current) {
      clearTimeout(rotationTimeoutRef.current)
      rotationTimeoutRef.current = null
    }
  }, [])

  const advance = useCallback((step: number) => {
    if (step === 0) return
    const normalizedStep = step > 0 ? 1 : -1
    setDirection(normalizedStep)
    setCurrentIndex((prev) => (prev + normalizedStep + artifactSlides.length) % artifactSlides.length)
  }, [])

  const scheduleNextRotation = useCallback(() => {
    clearRotationTimeout()

    if (isHovered) {
      return
    }

    rotationTimeoutRef.current = setTimeout(() => {
      advance(1)
    }, 2800)
  }, [advance, clearRotationTimeout, isHovered])

  useEffect(() => {
    scheduleNextRotation()

    return clearRotationTimeout
  }, [clearRotationTimeout, currentIndex, scheduleNextRotation])

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + artifactSlides.length) % artifactSlides.length
  }

  const promoteSlide = (step: number) => {
    advance(step)
  }

  return (
    <section className="bg-[#F5F5F5] px-6 py-24 sm:px-16 font-display" id="artifacts">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        <div className="flex flex-col gap-6 text-center">
          <h2 className="section-heading text-brand uppercase">Artifacts</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-brand sm:text-lg">
            A growing collection of finished pieces that capture the artistry behind our stories. Each artifact reflects
            the craftsmanship, curiosity, and imagination that define every project we create.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div
            className="relative flex h-[400px] w-full items-center justify-center"
            onMouseEnter={() => {
              setIsHovered(true)
              clearRotationTimeout()
            }}
            onMouseLeave={() => {
              setIsHovered(false)
              scheduleNextRotation()
            }}
          >
            <div className="relative flex h-full w-full items-center justify-center" style={{ perspective: "1400px" }}>
              {[-1, 0, 1].map((offset, positionIndex) => {
                const slideIndex = getSlideIndex(offset)
                const slide = artifactSlides[slideIndex]
                const position = positions[positionIndex]

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
                      setIsHovered(true)
                      clearRotationTimeout()
                    }}
                    onBlur={() => {
                      setIsHovered(false)
                      scheduleNextRotation()
                    }}
                  >
                    <div className="relative h-full w-full bg-gradient-to-br from-white/60 via-white/20 to-white/5">
                      <Image
                        src={slide.src || "/placeholder.svg"}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        sizes="400px"
                        priority={positionIndex === 1}
                      />
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex flex-col gap-6 text-base leading-relaxed text-brand sm:text-lg"
            >
              <h3 className="text-2xl font-semibold sm:text-3xl uppercase">{artifactSlides[currentIndex].name}</h3>
              <p>{artifactSlides[currentIndex].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
