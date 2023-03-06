import ProductCard from "$store/islands/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import type { LoaderReturnType } from "$live/std/types.ts";
import type { Product } from "$live/std/commerce/types.ts";

export interface Props {
  title: string;
  description: string;
  /** @description hex background color */
  background?: string;
  products: LoaderReturnType<Product[]>;
}

function ProductShelf({
  title,
  description,
  products,
  background = "bg-default",
}: Props) {
  return (
    <div
      class={`flex flex-col items-center justify-center py-12 px-8 lg:px-0 lg:py-16 bg-[${background}]`}
    >
      <div class="max-w-[700px] flex flex-col items-center justify-center">
        <h2 class="font-title text-7xl uppercase mb-2 text-center">{title}</h2>
        <p class="text-center text-base">{description}</p>
      </div>

      <Container class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mt-16">
        {products?.map((product, index) => (
          <div key={index} class="w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default ProductShelf;
