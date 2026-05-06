"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081732/samples/people/bicycle.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/jazz.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/people/boy-snow-hoodie.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081730/samples/people/smiling-man.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081729/samples/people/kitchen-bar.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081732/samples/food/pot-mussels.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/smile.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081731/samples/landscapes/nature-mountains.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081730/samples/people/sitting.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081729/samples/animals/three-dogs.jpg",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081728/samples/ecommerce/shoes.png",
  "https://res.cloudinary.com/dpblvshsz/image/upload/f_auto,q_auto/v1778081728/samples/people/model.jpg",
];

export default function GalleryReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    lenis.on("scroll", ScrollTrigger.update);
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const title = document.querySelector(".gallery-title");
      const statement = document.querySelector(".gallery-statement");
      const stage = document.querySelector(".gallery-matrix");
      const overlay = document.querySelector(".gallery-overlay");
      const cells = gsap.utils.toArray<HTMLElement>(".matrix-cell");
      if (!title || !statement || !stage || !overlay || !cells.length) return;

      gsap.set(stage, {
        scale: 0.1,
        clipPath: "circle(2.2% at 50% 50%)",
        transformOrigin: "50% 50%",
      });
      gsap.set(cells, { opacity: 1, scale: 1, x: 0, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(statement, { opacity: 0.24, duration: 1.1, ease: "power2.out" }, 0)
        .to(title, { opacity: 0.08, duration: 1.1, ease: "power2.out" }, 0)
        .to(overlay, { opacity: 0.2, duration: 1.1, ease: "power2.out" }, 0)
        .to(
          stage,
          {
            scale: 0.56,
            clipPath: "circle(26% at 50% 50%)",
            duration: 1.1,
            ease: "power2.out",
          },
          0,
        )
        .to(
          stage,
          {
            scale: 1,
            clipPath: "circle(125% at 50% 50%)",
            duration: 1.75,
            ease: "expo.out",
          },
          ">",
        )
        .to(
          statement,
          {
            opacity: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          "<+0.1",
        )
        .to(
          cells,
          {
            scale: 1.02,
            duration: 1.6,
            ease: "none",
            stagger: { each: 0.01, from: "center", grid: "auto" },
          },
          "<",
        )
        .to(
          overlay,
          {
            opacity: 0,
            duration: 1.25,
            ease: "sine.out",
          },
          "<+0.35",
        )
        .to(
          title,
          {
            opacity: 0,
            duration: 0.8,
            ease: "sine.out",
          },
          "<",
        );

      gsap.to(cells, {
        yPercent: (i) => (i % 2 === 0 ? -1.6 : 1.6),
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.08, from: "center" },
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
          <h1 className="gallery-title">Gallery</h1>

          <p className="gallery-statement">[A POINT OF REFERENCE FOR A BETTER PERSPECTIVE.]</p>

          <div className="gallery-matrix">
            {IMAGES.map((src, i) => (
              <figure className="matrix-cell" key={`${src}-${i}`}>
                <img src={src} alt="" loading={i < 4 ? "eager" : "lazy"} />
              </figure>
            ))}
          </div>

          <div className="gallery-overlay" />
        </div>
      </section>

      <section className="content-section">
        <div className="content-inner">
          <h2 className="content-heading">Cinematic Digital Experiences</h2>
          <p className="content-text">A cohesive center-origin reveal that expands as one architectural canvas rather than independent card animations.</p>
        </div>
      </section>
    </>
  );
}
