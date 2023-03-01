import { Image as LiveImage } from "$live/std/ui/types/Image.ts";

export interface NavLink {
  label: string;
  /**
   * @default /
   */
  href: string;
}

export interface NavItem {
  href: string;
  label: string;
  children?: NavLink[];
  featured?: NavLink[];

  /** @description image to be shown inside the megamenu */
  image?: LiveImage;
}
