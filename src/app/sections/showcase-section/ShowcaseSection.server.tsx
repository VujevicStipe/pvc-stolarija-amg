// server component (default in app router) — import JSON at build time
import React from "react";
import { Slide } from "../../types/slide";
import slides from "../../data/slides.json";
import ShowcaseSlider from "@/app/components/showcase-slider/ShowcaseSlider";

export default function ShowcaseSection() {
  // slides is imported at build time and available on the server;
  // it's typed as any from JSON import — cast to Slide[] for safety
  const typedSlides = slides as Slide[];

  return (
    <section>
      <ShowcaseSlider slides={typedSlides} />
    </section>
  );
}
