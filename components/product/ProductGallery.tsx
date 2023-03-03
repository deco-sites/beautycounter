import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useEffect, useState } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import ProductPreviewer from "./ProductPreviewer.tsx";
import ProductCard from "$store/islands/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Filters from "$store/components/search/Filters.tsx";
import type { LoaderReturnType } from "$live/std/types.ts";
import Controls from "$store/components/search/Controls.tsx";
import type { Product, ProductListingPage } from "$live/std/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage>;
}

interface Previewer {
  previewerNumber: number;
  product: Product;
}

// desktop columns size, one-based
const DESKTOP_COLS_SIZE = 4;
const PRODUCT_PREVIEWER_ID = "product-gallery-previewer";

function ProductGallery({ page }: Props) {
  const filters = page?.filters;
  const [productPreview, setProductPreview] = useState<Previewer>();

  const renderProduct = (product: Product, index: number) => {
    const previewerNumber = Math.trunc(index / DESKTOP_COLS_SIZE);
    const previewAction = () => setProductPreview({ previewerNumber, product });
    const closePreview = () => setProductPreview(undefined);
    const shouldRenderPreviewRow = index % DESKTOP_COLS_SIZE === 0;
    const componentsToReturn = [];

    if (
      shouldRenderPreviewRow &&
      productPreview &&
      productPreview.previewerNumber === previewerNumber
    ) {
      componentsToReturn.push(
        <div
          id={`${PRODUCT_PREVIEWER_ID}-${previewerNumber}`}
          class="col-span-4 hidden md:flex lg:flex justify-center border-b-1 border-default"
        >
          <ProductPreviewer
            closePreview={closePreview}
            product={productPreview.product}
          />
        </div>,
      );
    }

    componentsToReturn.push(
      <div class="w-full sm:px-2 list-none">
        <ProductCard product={product} preview={previewAction} />
      </div>,
    );

    return componentsToReturn;
  };

  useEffect(() => {
    if (!productPreview) return;

    const id = `${PRODUCT_PREVIEWER_ID}-${productPreview.previewerNumber}`;
    const previewer = document.getElementById(id);
    if (!previewer) return;

    const previewerBounding = previewer.getBoundingClientRect();
    const previewerPosition = previewerBounding.top + window.scrollY;
    const scrollTop = previewerPosition - 120;

    setTimeout(
      () => window.scrollTo({ top: scrollTop, behavior: "smooth" }),
      0,
    );
  }, [productPreview]);

  return (
    <div class="flex flex-row p-6 lg:p-20 border-t-1 border-default lg:gap-6">
      <div class="hidden lg:block">
        <Filters filters={filters} />
      </div>

      <Container>
        <Controls />

        <div
          class={`relative grid grid-cols-2 sm:grid-cols-${DESKTOP_COLS_SIZE} gap-2 sm:gap-10 items-center`}
        >
          {page?.products?.map(renderProduct)}
        </div>

        <div class="flex flex-row items-center justify-center gap-2 my-4">
          <Button
            as="a"
            rel="prev"
            disabled={!page.pageInfo.previousPage}
            href={page.pageInfo.previousPage ?? "#"}
            variant="icon"
          >
            <Text tone={page.pageInfo.previousPage ? "default" : "subdued"}>
              <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
            </Text>
          </Button>
          <Text variant="caption-regular">
            {page.pageInfo.currentPage + 1}
          </Text>
          <Button
            as="a"
            rel="next"
            disabled={!page.pageInfo.nextPage}
            href={page.pageInfo.nextPage ?? "#"}
            variant="icon"
          >
            <Text tone={page.pageInfo.nextPage ? "default" : "subdued"}>
              <Icon id="ChevronRight" width={20} height={20} strokeWidth={2} />
            </Text>
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default ProductGallery;
