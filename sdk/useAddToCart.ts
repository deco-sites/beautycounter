import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useCart } from "$store/sdk/cart/useCart.ts";

interface Options {
  skuId: string;
  sellerId?: string;
}

export const useAddToCart = ({ skuId, sellerId }: Options) => {
  const isAddingToCart = useSignal(false);
  const { addItems, loading } = useCart();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sellerId) {
      return;
    }

    try {
      isAddingToCart.value = true;
      await addItems({
        orderItems: [{ id: skuId, seller: sellerId, quantity: 1 }],
      });
    } finally {
      isAddingToCart.value = false;
    }
  }, [skuId, sellerId]);

  return { onClick, disabled: loading.value, loading: isAddingToCart.value };
};
