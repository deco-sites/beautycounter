import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";

interface Props {
  skuId: string;
  sellerId: string;
}

function AddToCartButton({ skuId, sellerId }: Props) {
  const props = useAddToCart({
    skuId,
    sellerId,
  });

  return (
    <Button {...props} class="w-full">
      <span class="hidden md:block">Add to bag</span>
      <span class="block md:hidden">Add</span>
    </Button>
  );
}

export default AddToCartButton;
