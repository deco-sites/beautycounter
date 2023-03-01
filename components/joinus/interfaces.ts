import { Image as LiveImage } from "$live/std/ui/types/Image.ts";
export interface Card {
  title: string;
  description: string;
  cta: string;
  image: LiveImage;
}

export interface Props {
  /**
   * @title Title
   * @description The title of this section
   */
  title: string;

  /**
   * @description The content of this section
   */
  content: string;

  /**
   * @title Cards
   * @description The configuration of the cards of this section
   */
  cards: Card[];
}
