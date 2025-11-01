"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import type { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";
import { Slide } from "../../types/slide";
import styles from "./ShowcaseSlider.module.css";

type Props = {
  slides: Slide[];
};

export default function ShowcaseSlider({ slides }: Props) {
  const [current, setCurrent] = useState<number>(0);
  const prevRef = useRef<number | null>(null);
  const [leaving, setLeaving] = useState<{
    idx: number;
    dir: "left" | "right";
  } | null>(null);

  const MAX_PER_VIEW = 3;
  const perView = (() => {
    if (slides.length <= 1) return 1;
    return Math.min(MAX_PER_VIEW, Math.max(1, slides.length - 1));
  })();

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView, spacing: 24 },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: Math.min(2, perView), spacing: 16 },
      },
      "(max-width: 640px)": { slides: { perView: 1, spacing: 12 } },
    },
    created(s: KeenSliderInstance) {
      setCurrent(s.track.details.rel ?? 0);
    },
    slideChanged(s: any) {
      const idx = s?.track?.details?.rel ?? s?.details?.relative ?? 0;
      const prev = prevRef.current ?? current;
      const dir = idx > prev ? "right" : idx < prev ? "left" : null;
      if (dir && prev !== idx) {
        setLeaving({ idx: prev, dir: dir === "right" ? "right" : "left" });
        window.setTimeout(() => setLeaving(null), 420);
      }
      prevRef.current = idx;
      setCurrent(idx);
    },
  } as any);

  useEffect(() => {
    // optional debug, remove in production
    // console.log("perView", perView, "slides", slides.length);
  }, [perView, slides.length]);

  const goPrev = () => {
    (
      slider as React.MutableRefObject<KeenSliderInstance | null>
    )?.current?.prev?.();
  };
  const goNext = () => {
    (
      slider as React.MutableRefObject<KeenSliderInstance | null>
    )?.current?.next?.();
  };

  const getStateClass = (i: number) => {
    if (leaving && leaving.idx === i) {
      return leaving.dir === "left" ? styles.leavingLeft : styles.leavingRight;
    }
    if (i === current) return styles.active;
    if (i < current) return styles.leftOfActive;
    return styles.rightOfActive;
  };

  return (
    <section className={styles.container} aria-label="Showcase">
      <div className={styles.inner}>
        <div className={styles.leftPanel}>
          <h2 className={styles.title}>{slides[current]?.title}</h2>
          {slides[current]?.tag && (
            <div className={styles.tag}>{slides[current].tag}</div>
          )}
          <ul className={styles.bullets}>
            {(slides[current]?.bullets || []).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <div className={styles.controls}>
            <button
              className={styles.btn}
              onClick={goPrev}
              aria-label="Previous"
            >
              ←
            </button>
            <button className={styles.btn} onClick={goNext} aria-label="Next">
              →
            </button>
          </div>
        </div>

        <div className={styles.sliderArea}>
          <div ref={sliderRef} className={`keen-slider ${styles.keen}`}>
            {slides.map((s, i) => {
              const stateClass = getStateClass(i);
              return (
                <div
                  key={s.id}
                  className={`keen-slider__slide ${styles.slide} ${stateClass}`}
                >
                  <div className={styles.card}>
                    <Image
                      src={s.src}
                      alt={s.alt ?? s.title}
                      width={420}
                      height={300}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
