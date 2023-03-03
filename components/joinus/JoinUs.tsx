import { Card, Props } from "./interfaces.ts";
import Image from "$live/std/ui/components/Image.tsx";

function JoinUs(props: Props) {
  const { title, content, cards } = props;

  const renderCard = (card: Card, index: number) => {
    const { title, description, image, cta } = card;
    const mt = index === 0 ? "" : "mt-16 lg:mt-0";

    return (
      <div class={`cursor-pointer ${mt}`}>
        <Image
          src={image}
          alt={title}
          width={420}
          height={420}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          class="object-cover w-full mb-6"
          sizes="(max-width: 1024px) 80vw, 30vw"
        />

        <p class="uppercase text-2xl font-bold text-center">{title}</p>
        <p class="my-6 text-center">{description}</p>
        <p class="uppercase font-bold text-center hover:underline">{cta}</p>
      </div>
    );
  };

  return (
    <div class="w-full flex items-center justify-center px-12">
      <div class="max-w-[989px] flex items-center justify-center flex-col py-16">
        <h2 class="font-title text-7xl uppercase mb-2">{title}</h2>
        <p class="text-center text-lg">{content}</p>

        <div class="mt-12 lg:grid lg:grid-cols-3 lg:gap-12">
          {cards.map(renderCard)}
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
