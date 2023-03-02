import { useState } from "preact/hooks";
import Text from "$store/components/ui/Text.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Avatar from "$store/components/ui/Avatar.tsx";
import Image from "$live/std/ui/components/Image.tsx";
import type { Product } from "$live/std/commerce/types.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  action?: string;
  selectVariations?: string;
}

function ProductCard(
  {
    product,
    preload,
    action = "Add to bag",
    selectVariations = "Select a size",
  }: Props,
) {
  const possibilities = useVariantPossibilities(product);
  const sizePossibility = possibilities["TAMANHO"] ?? possibilities["Tamanho"];
  const options = Object.entries(sizePossibility ?? {});

  const { url, productID, name, image: images, offers } = product;
  const { listPrice, price, seller } = useOffer(offers);

  const [chosenSize, setChosenSize] = useState<string>();
  const [front] = images ?? [];

  return (
    <div
      id={`product-card-${productID}`}
      class="flex flex-1 flex-col h-full group border-1 hover:border-gray-400 border-transparent flex flex-col"
    >
      <div aria-label="product link" class="flex flex-1 flex-col">
        <div class="relative w-full overflow-hidden">
          <a href={url}>
            <Image
              width={200}
              height={200}
              src={front.url!}
              preload={preload}
              alt={front.alternateName}
              loading={preload ? "eager" : "lazy"}
              sizes="(max-width: 640px) 50vw, 20vw"
              class="w-full hover:scale-110 hover:opacity-60 transition-all"
            />
          </a>
        </div>

        <div class="flex flex-col px-3 py-1 mt-auto">
          {seller && renderSizes(options, setChosenSize, chosenSize)}

          <a href={url} class="mt-2">
            <Text
              class="overflow-hidden overflow-ellipsis whitespace-nowrap"
              variant="caption-regular"
            >
              {name}
            </Text>

            <div class="flex items-center gap-2">
              <Text
                class="line-through"
                variant="subcaption-regular"
                tone="subdued"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>

              <Text variant="caption-strong" tone="default">
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>
          </a>
        </div>

        {renderButton(
          selectVariations,
          action,
          options,
          chosenSize,
          product.url,
        )}
      </div>
    </div>
  );
}

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function renderSizes(
  options: [string, string][],
  setChosenSize: (i: string) => void,
  chosenSize?: string,
) {
  if (options.length <= 1) {
    return null;
  }

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([url, value]) => {
        return (
          <Avatar
            content={value}
            class="bg-default"
            variant="abbreviation"
            active={url === chosenSize}
            onClick={() => setChosenSize(url)}
          />
        );
      })}
    </ul>
  );
}

function renderButton(
  selectVariations: string,
  action: string,
  options: [string, string][],
  chosenSize?: string,
  url?: string,
) {
  console.log("here", chosenSize);
  const baseClasses = [
    "opacity-0",
    "group-hover:opacity-100",
    "mt-2",
    "tracking-widest",
    "p-4",
    "w-full",
    "text-center",
    "uppercase",
    "text-[9px]",
    "border-t-1",
    "border-gray-400",
  ].join(" ");

  if (options.length <= 1 || chosenSize !== undefined) {
    return (
      <a href={url} class={`${baseClasses} text-gray-800`}>
        {action}
      </a>
    );
  }

  return (
    <button
      disabled
      type="button"
      class={`${baseClasses} cursor-not-allowed text-gray-400`}
    >
      {selectVariations}
    </button>
  );
}

export default ProductCard;
