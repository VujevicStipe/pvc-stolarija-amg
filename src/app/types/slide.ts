export type Slide = {
  id: string | number;
  title: string;
  tag?: string;
  bullets?: string[];
  src: string; // public path or remote URL
  alt?: string;
};
