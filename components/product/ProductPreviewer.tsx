import type { Product } from "$live/std/commerce/types.ts";

interface Props {
  product: Product;
}

function ProductPreviewer(props: Props) {
  return <h1>ta mostrando aqui...</h1>;
}

export default ProductPreviewer;
