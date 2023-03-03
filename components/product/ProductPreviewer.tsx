import { useState } from "preact/hooks";
import Text from "$store/components/ui/Text.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";
import Image from "$live/std/ui/components/Image.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import type { Product } from "$live/std/commerce/types.ts";

import { tw } from "twind";
import { animation, css, keyframes } from "twind/css";

interface Props {
  product: Product;
  closePreview: () => void;
}

function ProductPreviewer(props: Props) {
  const { url, name, offers, category, sku: skuId, image } = props.product;
  const { listPrice, price, seller } = useOffer(offers);
  const [isAdded, setIsAdded] = useState(false);
  const { onClick, disabled } = useAddToCart({ skuId, sellerId: seller || "" });
  const [front] = image ?? [];

  const addToCart = (e: MouseEvent) => {
    onClick(e);
    setIsAdded(true);
    setInterval(() => setIsAdded(false), 2000);
  };

  const fadeAnimation = tw(css(animation({
    animationDuration: `1s`,
    animationFillMode: "forwards",
    animationTimingFunction: "ease",
  }, {})));

  const fadeIn = tw(keyframes`
    0% { 
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  `);

  return (
    <div
      class={`flex opacity-0 ${fadeAnimation} flex-row max-w-[800px] pb-8 gap-4`}
      style={`animation-name: ${fadeIn};`}
    >
      <a
        href={url}
        class="w-[200px] h-full flex items-center justify-center"
      >
        <Image
          width={200}
          height={200}
          loading="lazy"
          src={front.url!}
          alt={front.alternateName}
          sizes="(max-width: 640px) 50vw, 20vw"
        />
      </a>

      <div class="flex flex-col flex-1">
        <div class="flex flex-row">
          <a href={url}>
            <Text variant="heading-strong">{name}</Text>
          </a>

          <button
            onClick={props.closePreview}
            class="ml-auto focus:outline-none"
          >
            close
          </button>
        </div>

        <Text variant="caption-regular">
          #{skuId}
          {category && `| ${category}`}
        </Text>

        <div class="flex items-center gap-2 my-4">
          <Text class="line-through" variant="body-regular" tone="subdued">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </Text>

          <Text variant="body-strong" tone="default">
            {formatPrice(price, offers!.priceCurrency!)}
          </Text>
        </div>

        {/* there is no description in our sample data */}
        <Text variant="body-regular">
          Now with a brand-new look.

          An everyday balm for everyone. To help soothe and relieve chapped,
          cracked, and irritated skin, use this oh-so-gentle hydrating balm. Our
          fragrance-free blend includes shea butter and jojoba seed oil that can
          be used to hydrate delicate areas, like lips, eyelids, and cuticles.
          It’s a multipurpose...
        </Text>

        <div class="mt-4">
          {isAdded
            ? (
              <Button variant="quiet">
                Added to bag
              </Button>
            )
            : (
              <Button onClick={addToCart} disabled={disabled}>
                Add to bag
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}

export default ProductPreviewer;
