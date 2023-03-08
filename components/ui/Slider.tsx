import { tw } from "twind";
import { useId, useRef } from "preact/hooks";
import { animation, css, keyframes } from "twind/css";
import { ComponentChild, toChildArray } from "preact";

const getPrevNextIndexes = (index: number, total: number) => {
  return {
    prev: (total + (index - 1)) % total,
    next: (total + (index + 1)) % total,
  };
};

const generateSlideId = (id: string, index: number) => `${id}-slide${index}`;

interface Props {
  class?: string;
  children?: ComponentChild[];
  dot?: ComponentChild;
  leftArrow?: ComponentChild;
  rightArrow?: ComponentChild;
  animationDuration?: number;
  onChange?: (index: number) => void;
}

function Slider(props: Props) {
  const {
    class: _class = "",
    children,
    dot,
    leftArrow,
    rightArrow,
    animationDuration = 3,
    onChange,
  } = props;

  if (children === undefined) {
    return null;
  }

  const id = useId();
  const containerRef = useRef<HTMLOListElement>(null);
  const childrenArray = toChildArray(children);
  const childrenLength = childrenArray.length;

  const toStart = tw(keyframes`
            75% { left: 0; }
            95% { left: -${Math.max(childrenLength - 1, 0)}00%; }
            98% { left: -${Math.max(childrenLength - 1, 0)}00%; }
            99% { left: 0; }
  `);

  const toNext = tw(keyframes`
    75% { left: 0; }
    95% { left: 100%; }
    98% { left: 100%; }
    99% { left: 0; }
  `);

  const snap = tw(keyframes`
          96% { scroll-snap-align: center; }
          97% { scroll-snap-align: none; }
          99% { scroll-snap-align: none; }
          100% { scroll-snap-align: center; }`);

  const autoPlayAnimation = tw(css(animation({
    animationDuration: `${animationDuration}s`,
    animationTimingFunction: "ease",
    animationIterationCount: "infinite",
  }, {})));

  // Inline top-[calc(50% - 1.25rem)] doesn't work.
  // This is 50% - ((arrow svg height + padding) / 2)
  const arrowTopClass = tw(() => ({ top: "calc(50% - 1.25rem)" }));

  // programmatically scroll to element id
  const scrollTo = (index: number) => {
    return (e: MouseEvent) => {
      e.preventDefault();
      if (onChange) onChange(index);

      const elementId = generateSlideId(id, index);
      const element = document.getElementById(elementId);

      containerRef.current?.scrollTo({
        left: element?.offsetLeft,
        behavior: "smooth",
      });
    };
  };

  return (
    <section
      id={id}
      class={`relative group ${_class}`}
      aria-label="Gallery"
      data-carousel
    >
      <ol
        ref={containerRef}
        class="absolute inset-0 flex scrollbar-none overflow-x-scroll overflow-y-hidden scroll-smooth scroll-x-mandatory"
        data-carousel-viewport
      >
        {childrenArray?.map((child, index) => {
          const isFirst = index === 0;
          const isLast = index === childrenLength - 1;
          const { next, prev } = getPrevNextIndexes(index, childrenLength);

          const prevNextArrows = (!!leftArrow || !!rightArrow) && (
            <>
              {!!leftArrow && (
                <a
                  class={`absolute ${arrowTopClass} left-0 ml-2 text-white outline-none p-2`}
                  href={`#${generateSlideId(id, prev)}`}
                  onClick={scrollTo(prev)}
                  data-carousel-prev
                >
                  {leftArrow}
                </a>
              )}
              {!!rightArrow && (
                <a
                  class={`absolute ${arrowTopClass} right-0 mr-2 text-white outline-none p-2`}
                  href={`#${generateSlideId(id, next)}`}
                  onClick={scrollTo(next)}
                  data-carousel-next
                >
                  {rightArrow}
                </a>
              )}
            </>
          );

          return (
            <li
              class="relative w-full"
              style="flex: 0 0 100%"
              id={generateSlideId(id, index)}
              data-carousel-slide
            >
              {child}
              <div
                class={`absolute top-0 left-0 w-full h-full scroll-snap-center ${autoPlayAnimation} animate-carousel-snap group-hover:animate-none group-focus-within:animate-none`}
                style={`animation-name: ${isLast ? toStart : toNext}, ${snap};`}
                data-carousel-snapper
              >
                {isFirst && prevNextArrows}
              </div>
              {!isFirst && prevNextArrows}
            </li>
          );
        })}
      </ol>
      {!!dot && (
        <aside class="absolute right-8 lg:right-16 bottom-2">
          <ol class="inline-block" data-carousel-navigation>
            {childrenArray.map((_, index) => {
              return (
                <li
                  class="inline-block px-0.5 rounded-full text-white outline-none"
                  data-carousel-item
                >
                  <a
                    href={`#${generateSlideId(id, index)}`}
                    class="focus:text-gray-600"
                    onClick={scrollTo(index)}
                  >
                    {dot}
                  </a>
                </li>
              );
            })}
          </ol>
        </aside>
      )}
    </section>
  );
}

export default Slider;
