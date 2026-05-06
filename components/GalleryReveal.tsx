"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081732/samples/people/bicycle.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/jazz.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/boy-snow-hoodie.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081730/samples/people/smiling-man.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081729/samples/people/kitchen-bar.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081732/samples/people/bicycle.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/jazz.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/boy-snow-hoodie.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081730/samples/people/smiling-man.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081729/samples/people/kitchen-bar.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081732/samples/people/bicycle.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/jazz.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/boy-snow-hoodie.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081730/samples/people/smiling-man.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081729/samples/people/kitchen-bar.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081732/samples/people/bicycle.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/jazz.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/boy-snow-hoodie.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081730/samples/people/smiling-man.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081729/samples/people/kitchen-bar.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081732/samples/people/bicycle.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/jazz.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/boy-snow-hoodie.jpg",
    "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081730/samples/people/smiling-man.jpg",
  ];

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".collage-tile");
      if (!tiles.length) return;

      // initial micro focal scale and clip so the collage feels like a tiny center anchor
      gsap.set(collageRef.current, {
        scale: 0.12,
        clipPath: "circle(3.8% at 50% 50%)",
        borderRadius: "48px",
        transformOrigin: "50% 50%",
        willChange: "transform, clip-path",
      });

      // compute per-tile offsets and wave assignment for geometric expansion
      const container = collageRef.current as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = {
        x: containerRect.left + containerRect.width / 2,
        y: containerRect.top + containerRect.height / 2,
      };

      // assign each tile to a "wave" (concentric ring) based on distance from center
      const tileWaves: Map<number, HTMLElement[]> = new Map();
      const tileDistances: { tile: HTMLElement; dist: number; i: number }[] = [];

      tiles.forEach((tile, i) => {
        const rect = tile.getBoundingClientRect();
        const tileCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        const distance = Math.sqrt(
          Math.pow(tileCenter.x - containerCenter.x, 2) +
          Math.pow(tileCenter.y - containerCenter.y, 2)
        );
        tileDistances.push({ tile, dist: distance, i });
      });

      // sort by distance and group into waves using symmetric, structured pattern
      tileDistances.sort((a, b) => a.dist - b.dist);
      let waveIndex = 0;
      let tileCount = 0;
      const waveSize = [4, 8, 12, 999]; // symmetric wave pattern: 4 → 8 → 12 → remaining
      let currentWaveSize = waveSize[waveIndex] || waveSize[waveSize.length - 1];

      tileDistances.forEach(({ tile, dist, i }) => {
        if (tileCount >= currentWaveSize && waveIndex < waveSize.length - 1) {
          waveIndex++;
          currentWaveSize = waveSize[waveIndex];
          tileCount = 0;
        }

        if (!tileWaves.has(waveIndex)) {
          tileWaves.set(waveIndex, []);
        }
        tileWaves.get(waveIndex)!.push(tile);
        tileCount++;

        // set initial transform so the tile appears at the collage center
        const rect = tile.getBoundingClientRect();
        const tileCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        const finalX = tileCenter.x - containerCenter.x;
        const finalY = tileCenter.y - containerCenter.y;
        const originX = 50 + (finalX / containerRect.width) * 40;
        const originY = 50 + (finalY / containerRect.height) * 40;

        gsap.set(tile, {
          x: -finalX * 0.98,
          y: -finalY * 0.98,
          scale: 0.1,
          opacity: 0,
          transformOrigin: `${originX}% ${originY}%`,
          willChange: "transform, opacity",
        });

        const centerIndex = Math.floor(tiles.length / 2);
        gsap.set(tile, {
          zIndex: 100 - Math.abs(i - centerIndex),
        });
      });

      const introDuration = 3.6; // slower, more deliberate reveal
      const waveDelay = 0.48;    // delay between waves (2 → 4 → 6 pattern)
      const settleDuration = 1.6; // subtle settling after reveal

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=700%",
          scrub: true,
          pin: true,
          anticipatePin: 0.8,
        },
      });

      // Title softens while the collage takes over the viewport
      tl.to(
        titleRef.current,
        {
          opacity: 0.06,
          scale: 1.06,
          filter: "blur(1px)",
          duration: introDuration,
          ease: "power3.out",
        },
        0
      );

      // Overlay fades away as the matrix emerges
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: introDuration,
        },
        0
      );

      // The collage itself expands from the center focus point
      tl.to(
        collageRef.current,
        {
          scale: 1,
          clipPath: "circle(100% at 50% 50%)",
          borderRadius: "0px",
          duration: introDuration,
          ease: "power3.out",
        },
        0
      );

      // Tiles animate from center in WAVES with progressive SIZE GROWTH
      // Wave 0: small (0.25), Wave 1: medium (0.5), Wave 2: larger (0.75), Wave 3: full (1.0)
      // Creates triangular/pyramid expansion as user scrolls
      tileWaves.forEach((waveTiles, waveNum) => {
        const waveDelay = waveNum * (introDuration / 3.2);
        // progressive scale: each wave grows larger
        const waveScale = 0.25 + (waveNum * 0.25);
        
        tl.to(
          waveTiles,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: waveScale,
            duration: introDuration * 0.75,
            ease: "power3.out",
            stagger: {
              each: 0.05,
              from: "center",
            },
          },
          waveDelay
        );
      });

      // Grow remaining waves to full scale (settling phase)
      // Ensures all tiles reach 1.0 scale regardless of their wave
      tl.to(
        tiles,
        {
          scale: (i: number) => 1.0,
          y: (i: number) => {
            // subtle alternating parallax for structured feel
            return (i % 5 === 0 || i % 5 === 4) ? -2 : (i % 5 === 2) ? 2 : 0;
          },
          duration: settleDuration,
          ease: "power1.out",
          stagger: {
            amount: 0.28,
            from: "center",
          },
        },
        ">"
      );

      // continuous micro motion for a living canvas with cinematic depth
      gsap.to(tiles, {
        y: (i: number) => gsap.utils.random(-6, 6),
        duration: (i: number) => gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.06, from: "center" },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <section className="gallery-wrapper" ref={sectionRef}>
        <div className="sticky-gallery">
          <div className="gallery-text">
            <h1 className="gallery-title" ref={titleRef}>
              Gallery
            </h1>
          </div>

          <div className="overlay" ref={overlayRef} />

          <div className="collage-frame">
            <div className="gallery-collage" ref={collageRef}>
              {images.map((img, index) => {
                // clean, symmetric grid layout with structured spacing
                // pattern: mostly 1x1 with strategic 2-column or 2-row accents
                let cls = "";
                
                // Create a symmetric pattern with minimal variation
                if (index === 4) cls = "span-2";        // row 1: accent
                else if (index === 9) cls = "span-2row";  // column accent
                else if (index === 14) cls = "span-2";    // row accent
                else if (index === 19) cls = "span-2row";  // column accent
                
                return (
                  <div className={`collage-tile ${cls}`} key={`${img}-${index}`}>
                    <img
                      src={img}
                      className="collage-image"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-inner">
          <h2 className="content-heading">
            Cinematic Digital Experiences
          </h2>

          <p className="content-text">
            This section appears after the gallery reveal animation.
            Replace this with your actual gallery content, project showcase,
            or team visuals.
          </p>
        </div>
      </section>
    </>
  );
}