export type { Image as LiveImage } from "$live/std/ui/types/Image.ts";
import type { Props } from "$store/components/ui/carousel/interfaces.ts";

import Carousel from "$store/islands/Carousel.tsx";

function CarouselSection(props: Props) {
  return <Carousel {...props} />;
}

export default CarouselSection;
