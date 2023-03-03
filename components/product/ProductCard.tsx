import { useMemo, useState } from "preact/hooks";
import Text from "$store/components/ui/Text.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Avatar from "$store/components/ui/Avatar.tsx";
import Image from "$live/std/ui/components/Image.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import type { Product } from "$live/std/commerce/types.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;

  action?: string;
  preload?: boolean;
  preview?: () => void;
  selectVariations?: string;
}

function ProductCard(props: Props) {
  const {
    product,
    preload,
    action = "Add to bag",
    selectVariations = "Select a size",
    preview,
  } = props;

  const possibilities = useVariantPossibilities(product);
  const sizePossibility = possibilities["TAMANHO"] ?? possibilities["Tamanho"];
  const options = Object.entries(sizePossibility ?? {});

  const { url, productID, name, image: images, offers } = product;
  const { listPrice, price, seller } = useOffer(offers);

  const [chosenSize, setChosenSize] = useState<string>();
  const [front] = images ?? [];

  const skuId: string | undefined = useMemo(() => {
    if (options.length > 1) return extractSkuId(chosenSize);
    return extractSkuId(url);
  }, [url, chosenSize, extractSkuId]);

  return (
    <div
      id={`product-card-${productID}`}
      class="flex flex-1 flex-col h-full group border-1 border-gray-400 lg:border-transparent lg:hover:border-gray-400 flex flex-col"
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

        <div class="flex flex-1 flex-col px-3 py-1">
          {seller && renderSizes(options, setChosenSize, chosenSize)}

          <a href={url} class="mt-auto">
            <Text variant="caption-regular">
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
          skuId,
          seller,
          preview,
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
    <ul class="flex justify-center items-center gap-2 flex-wrap mb-2">
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
  skuId?: string,
  sellerId?: string,
  preview?: () => void,
) {
  const [isAdded, setIsAdded] = useState(false);
  const componentsToRender = [];

  const { onClick: addToCart } = useAddToCart({
    skuId: skuId || "",
    sellerId: sellerId || "",
  });

  const addToCartProxy = (e: MouseEvent) => {
    addToCart(e);
    setIsAdded(true);
    setInterval(() => setIsAdded(false), 2000);
  };

  const textClasses = [
    "tracking-widest",
    "justify-center",
    "uppercase",
    "text-[9px]",
    "flex-1",
    "flex",
    "p-4",
  ].join(" ");

  if (isAdded) {
    componentsToRender.push(
      <div class={`${textClasses} text-green-600`}>
        Added to bag
      </div>,
    );
  } else if (skuId !== undefined) {
    componentsToRender.push(
      <button onClick={addToCartProxy} class={`${textClasses} text-gray-800`}>
        {action}
      </button>,
    );
  } else {
    componentsToRender.push(
      <button
        disabled
        type="button"
        class={`${textClasses} cursor-not-allowed text-gray-400`}
      >
        {selectVariations}
      </button>,
    );
  }

  if (preview) {
    componentsToRender.push(
      <div
        onClick={preview}
        class={`${textClasses} hidden lg:block border-l-1 border-gray-400 text-gray-800`}
      >
        Quick view
      </div>,
    );
  }

  const containerClasses = [
    "opacity-100",
    "lg:opacity-0",
    "lg:group-hover:opacity-100",
    "mt-2",
    "w-full",
    "border-t-1",
    "border-gray-400",
    "focus:outline-none",
    "flex",
    "flex-row",
  ].join(" ");

  return (
    <button type="button" class={containerClasses}>
      {componentsToRender}
    </button>
  );
}

function extractSkuId(url?: string) {
  if (!url) return undefined;
  const parsedUrl = new URL(url);
  return parsedUrl.searchParams.get("skuId") || undefined;
}

export default ProductCard;
