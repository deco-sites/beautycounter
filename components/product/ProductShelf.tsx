import Text from "$store/components/ui/Text.tsx";
import ProductCard from "$store/islands/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import type { LoaderReturnType } from "$live/std/types.ts";
import type { Product } from "$live/std/commerce/types.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[]>;
}

function ProductShelf({
  title,
  products,
}: Props) {
  return (
    <div class="flex flex-col">
      {title && (
        <h2>
          <Text class="uppercase" variant="subheading-strong">{title}</Text>
        </h2>
      )}

      <Container class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
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
