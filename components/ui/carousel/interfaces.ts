import { Image as LiveImage } from "$live/std/ui/types/Image.ts";

export interface Image {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description when user clicks on the image, go to this link */
  href: string;
  /** @description Image's alt text */
  alt: string;
  /** @description slide title */
  title: string;
  /** @description slide description */
  description: string;
  /** @title Call to action */
  cta: string;
}

export interface Props {
  /**
   * @description List of images to display in the carousel
   */
  images?: Image[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

export interface Dimension {
  w: number;
  h: number;
}
