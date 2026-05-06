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
    const lenis = new Lenis({ lerp: 0.065, smoothWheel: true });
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
      const core = gsap.utils.toArray<HTMLElement>(".matrix-cell.core");
      const outer = gsap.utils.toArray<HTMLElement>(".matrix-cell.outer");
      const overlay = document.querySelector(".gallery-overlay");
      if (!title || !statement || !stage || !overlay || !core.length || !outer.length) return;

      gsap.set(stage, { scale: 0.1, clipPath: "circle(2.5% at 50% 50%)" });
      gsap.set(core, { autoAlpha: 1 });
      gsap.set(outer, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(stage, { scale: 0.42, clipPath: "circle(13% at 50% 50%)", duration: 1, ease: "power2.out" }, 0)
        .to(title, { opacity: 0.28, duration: 1, ease: "power2.out" }, 0)
        .to(statement, { opacity: 1, duration: 0.7, ease: "none" }, 0)
        .to(outer, { autoAlpha: 1, duration: 0.8, stagger: 0.02, ease: "none" }, 0.55)
        .to(stage, { scale: 1, clipPath: "circle(130% at 50% 50%)", duration: 1.6, ease: "expo.out" }, 1)
        .to(title, { opacity: 0, duration: 1, ease: "sine.out" }, "<+0.1")
        .to(statement, { opacity: 0, duration: 0.8, ease: "sine.out" }, "<+0.1")
        .to(overlay, { opacity: 0, duration: 1.2, ease: "sine.out" }, "<+0.35")
        .to(stage, { xPercent: -2.5, yPercent: 1.8, duration: 1.8, ease: "none" }, ">")
        .to(stage, { xPercent: 1.6, yPercent: -1.2, duration: 1.8, ease: "none" }, ">");
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
              <figure className={`matrix-cell ${i < 4 ? "core" : "outer"}`} key={`${src}-${i}`}>
                <img src={src} alt="" loading={i < 6 ? "eager" : "lazy"} />
              </figure>
            ))}
          </div>

          <div className="gallery-overlay" />
        </div>
      </section>

      <section className="content-section">
        <div className="content-inner">
          <h2 className="content-heading">Cinematic Digital Experiences</h2>
          <p className="content-text">Built around one cohesive visual mass that expands from the center as a calm editorial reveal.</p>
        </div>
      </section>
    </>
  );
}
