import Text from "$store/components/ui/Text.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";
import Image from "$live/std/ui/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Container from "$store/components/ui/Container.tsx";
import type { LoaderReturnType } from "$live/std/types.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { ProductDetailsPage } from "$live/std/commerce/types.ts";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

const IMAGES_MOCK = [
  {
    url:
      `https://images.unsplash.com/photo-1669199205208-226158b9f9cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dnx8fHx8fDE2NzgyMjMyMzU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080`,
    alternateName: "nikutm-1",
  },
  {
    url:
      `https://images.unsplash.com/photo-1669199205165-fc95b5be4563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dnx8fHx8fDE2NzgyMjMyMDc&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080`,
    alternateName: "nikutm-2",
  },
  {
    url:
      `https://images.unsplash.com/photo-1669197800714-2dc0c62b7c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dnx8fHx8fDE2NzgyMjMyMjA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080`,
    alternateName: "nikutm-3",
  },
  {
    url:
      `https://images.unsplash.com/photo-1631268447695-25df11a9fff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dnx8fHx8fDE2NzgyMjMyMjY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080`,
    alternateName: "nikutm-4",
  },
  {
    url:
      `https://images.unsplash.com/photo-1669197801223-9903835e1ded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dnx8fHx8fDE2NzgyMjMyMjk&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080`,
    alternateName: "nikutm-5",
  },
];

function ProductDetails({ page }: Props) {
  if (!page) {
    return null;
  }

  const images = IMAGES_MOCK;
  const { breadcrumbList, product } = page;
  const [quantity, setQuantity] = useState(1);
  const { productID, offers, name, gtin } = product;
  const { price, listPrice, seller } = useOffer(offers);
  const refCreator = () => useRef<HTMLImageElement>(null);
  const imagesRefs = Array.from({ length: IMAGES_MOCK.length }, refCreator);

  const renderArrow = (id: AvailableIcons) => {
    return (
      <span class={"text-default"}>
        <Icon
          id={id}
          width={24}
          height={24}
          strokeWidth={2}
        />
      </span>
    );
  };

  const focusOnImage = (index: number) => {
    const image = imagesRefs[index].current;
    if (!image) return;

    const imageBounding = image.getBoundingClientRect();
    const imagePosition = imageBounding.top + window.scrollY;
    const scrollTop = imagePosition - 120;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  return (
    <div class="border-t-1 border-default">
      <Container class="py-6 px-4 lg:py-10 lg:px-10">
        <Breadcrumb breadcrumbList={breadcrumbList} />

        <div class="flex flex-col gap-4 lg:flex-row lg:gap-10 mt-4">
          {/* Desktop Images */}
          <div class="hidden lg:flex flex-row gap-4 max-w-[500px]">
            <div class="flex flex-col gap-4 w-[80px] sticky self-start top-[107px]">
              {images.map((img, index) => (
                <Image
                  width={80}
                  height={80}
                  src={img.url!}
                  alt={img.alternateName}
                  style={{ aspectRatio: "80 / 80" }}
                  onClick={() => focusOnImage(index)}
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
                  ref={imagesRefs[index]}
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

          {/* Mobile images */}
          <div class="block lg:hidden">
            <Slider
              animationDuration={9999}
              class="h-[300px] w-full"
              leftArrow={renderArrow("ChevronLeft")}
              rightArrow={renderArrow("ChevronRight")}
            >
              {images.map((img, index) => (
                <Image
                  width={300}
                  height={300}
                  sizes="100vw"
                  src={img.url!}
                  alt={img.alternateName}
                  class="scroll-snap-center w-full"
                  style={{ aspectRatio: "300 / 300" }}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </Slider>
          </div>

          {/* Basic Info */}
          <div class="sm:px-0 flex flex-col flex-1 sticky self-start top-[107px]">
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
            <div class="mt-8 sm:mt-10 flex flex-row gap-2 w-full md:w-min">
              <div class="max-w-min">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
              {seller && (
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                />
              )}
              <Button variant="icon" class="hidden md:block">
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
