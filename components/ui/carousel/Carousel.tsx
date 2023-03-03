import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Button from "$store/components/ui/Button.tsx";
import { Dimension, Image, Props } from "./interfaces.ts";
import { Picture, Source } from "$live/std/ui/components/Picture.tsx";

const mobileDimension: Dimension = { w: 1125, h: 1068 };
const desktopDimension: Dimension = { w: 2217, h: 1000 };
const aspectRatio = ({ w, h }: Dimension) => (((h / w) * 100) + 1).toFixed(2);

function Carousel({ images, preload }: Props) {
  const sliderClasses = [
    "w-full",
    "bg-[#f7f7f7]",
    "lg:bg-transparent",
    // this padding top (pt) is the aspect-ratio (height/width) value from the image below for each viewport
    `pt-[${aspectRatio(mobileDimension)}%]`,
    `lg:pt-[${aspectRatio(desktopDimension)}%]`,
  ];

  const dotIcon = (
    <Icon
      width={14}
      height={14}
      id="Circle"
      strokeWidth={2}
      class="text-default"
    />
  );

  const renderCallToAction = (image: Image, solid = false) => {
    const { title, description } = image;

    const titleClasses =
      "lg:w-[350px] uppercase mb-8 lg:mb-16 font-title text-6xl lg:text-8xl whitespace-nowrap";

    const containerClasses =
      "flex pt-12 absolute top-0 z-10 right-[63%] h-full justify-center items-center";

    return (
      <div class={solid ? "p-8" : containerClasses}>
        <div>
          <p class={titleClasses}>{title}</p>

          <p
            class="lg:max-w-[300px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <Button class="mt-8 lg:mt-16">{image.cta}</Button>
        </div>
      </div>
    );
  };

  const renderImage = (image: Image, index: number) => {
    const { mobile, desktop, alt } = image;

    const isFirst = index === 0;
    const lcp = isFirst && preload;

    return (
      <div class="relative">
        <Picture class="w-screen block" preload={lcp}>
          <Source
            media="(max-width: 1024px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={mobileDimension.w}
            height={mobileDimension.h}
          />
          <Source
            media="(min-width: 1024px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={desktopDimension.w}
            height={desktopDimension.h}
          />
          <img
            class="object-cover w-full"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>

        {/** the CTA is part of slide for desktop devices */}
        <div class="hidden lg:flex">
          {renderCallToAction(image)}
        </div>
      </div>
    );
  };

  return (
    <>
      <Slider
        dot={dotIcon}
        animationDuration={5}
        class={sliderClasses.join(" ")}
      >
        {images?.map(renderImage)}
      </Slider>

      <div class="flex lg:hidden bg-[#f7f7f7]">
        {/** TO-DO: remove this mock */}
        {renderCallToAction(images![0], true)}
      </div>
    </>
  );
}

export default Carousel;
