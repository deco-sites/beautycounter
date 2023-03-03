import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";
import Image from "$live/std/ui/components/Image.tsx";
import Container from "$store/components/ui/Container.tsx";
import type { LoaderReturnType } from "$live/std/types.ts";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import type { ProductDetailsPage } from "$live/std/commerce/types.ts";
import { useState } from "preact/hooks";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function ProductDetails({ page }: Props) {
  if (!page) {
    return null;
  }

  const { breadcrumbList, product } = page;
  const [quantity, setQuantity] = useState(1);
  const { productID, offers, name, gtin } = product;
  const { price, listPrice, seller } = useOffer(offers);

  const images = [
    {
      url: `https://source.unsplash.com/user/nikutm?v=${productID}`,
      alternateName: "nikutm-1",
    },
    {
      url: `https://source.unsplash.com/user/nikutm?v=${productID}-2`,
      alternateName: "nikutm-2",
    },
    {
      url: `https://source.unsplash.com/user/nikutm?v=${productID}-3`,
      alternateName: "nikutm-3",
    },
    {
      url: `https://source.unsplash.com/user/nikutm?v=${productID}-4`,
      alternateName: "nikutm-4",
    },
    {
      url: `https://source.unsplash.com/user/nikutm?v=${productID}-5`,
      alternateName: "nikutm-5",
    },
  ];

  return (
    <div class="border-t-1 border-default">
      <Container class="py-0 sm:py-10 ">
        <Breadcrumb breadcrumbList={breadcrumbList} />

        <div class="flex flex-col gap-4 sm:flex-row sm:gap-10 mt-4">
          {/* Images */}
          <div class="flex flex-row gap-4 w-[500px]">
            <div class="flex flex-col gap-4 w-[80px] sticky self-start top-[107px]">
              {images.map((img, index) => (
                <Image
                  width={80}
                  height={80}
                  src={img.url!}
                  alt={img.alternateName}
                  style={{ aspectRatio: "80 / 80" }}
                  sizes="(max-width: 640px) 30vw, 10vw"
                  class="opacity-50 hover:opacity-100 transition-all scroll-snap-center w-full cursor-pointer"
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>

            <div class="flex flex-col gap-4">
              {images.map((img, index) => (
                <Image
                  width={360}
                  height={500}
                  src={img.url!}
                  alt={img.alternateName}
                  class="scroll-snap-center w-full"
                  style={{ aspectRatio: "360 / 500" }}
                  sizes="(max-width: 640px) 50vw, 30vw"
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div class="px-4 sm:px-0 flex flex-col flex-1 sticky self-start top-[107px]">
            {/* Code and name */}
            <div>
              <h1>
                <Text variant="heading-strong">{name}</Text>
              </h1>
              <div>
                <Text
                  class="uppercase"
                  tone="subdued"
                  variant="subcaption-regular"
                >
                  Item #{gtin}
                </Text>
              </div>
            </div>

            {/* Prices */}
            <div class="mt-4">
              <div class="flex flex-row gap-2 items-center">
                <Text
                  tone="subdued"
                  class="line-through"
                  variant="body-regular"
                >
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </Text>

                <Text tone="default" variant="heading-strong">
                  {formatPrice(price, offers!.priceCurrency!)}
                </Text>
              </div>
            </div>

            {/* Packaging info */}
            <div class="mt-4 border-2 border-dashed border-default p-3 flex flex-row gap-2 items-center">
              <Text variant="body-regular" class="text-blue-900">
                This product qualifies for our Packaging Collection Program.
                Learn more about how we’ll do the recycling for you.
              </Text>

              <a href="#">
                <Icon
                  width={24}
                  height={24}
                  strokeWidth={2}
                  id="ChevronRight"
                  class="text-blue-900"
                />
              </a>
            </div>

            {/* Sizes */}
            <div class="border-y-1 border-default mt-4 py-2">
              <Text
                tone="default"
                class="uppercase"
                variant="caption-regular"
              >
                Size: <b>60ml/2fl oz</b>
              </Text>
            </div>

            {/* Add to Cart and Favorites button */}
            <div class="mt-2 sm:mt-10 flex flex-row gap-2 w-min">
              <div class="max-w-min">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
              {seller && (
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                />
              )}
              <Button variant="icon">
                <Icon id="Heart" width={24} height={24} strokeWidth={2} />
              </Button>
            </div>

            {/* Description card */}
            <div class="mt-8 md:mt-12 lg:mt-16 border-1 border-default p-4 flex flex-col">
              <Text variant="body-strong">Description</Text>

              <Text variant="body-regular">
                Now with an upgraded formula.
                <br />
                <br />

                Ten minutes to a purified complexion: this nutrient-rich kaolin
                clay mask with activated charcoal purifies and balances,
                absorbing excess oil and drawing out impurities. Salicylic and
                lactic acids aid in a gentle exfoliation, giving skin a smooth,
                polished look with a minimized appearance of pores. Perfect for
                those concerned with congestion and oily skin.
                <br />
                <br />

                <b>Benefits:</b>
                <br />

                Absorbs excess oil Visibly minimizes pores Purifies, detoxifies,
                and clarifies complexion Helps calm, refine, and smooth skin
                Featured Ingredients:
                <br />
                <br />

                Charcoal Powder: rich in natural minerals to help balance and
                purify Salicylic Acid and Lactic
                <br />
                <br />

                Acid: gently exfoliate and smooth skin’s surface
              </Text>
            </div>

            {/* Share */}
            <div class="border-y-1 border-default mt-8 p-4 flex flex-row gap-6">
              <Icon id="Instagram" width={24} height={24} strokeWidth={2} />
              <Icon id="Tiktok" width={24} height={24} strokeWidth={2} />
              <Icon id="Facebook" width={24} height={24} strokeWidth={2} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProductDetails;
