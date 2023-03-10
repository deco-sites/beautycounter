import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "$store/sdk/cart/useCart.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <>
      <Button
        variant="icon"
        aria-label="search icon button"
        onClick={() => {
          displaySearchbar.value = true;
        }}
      >
        <Icon id="MagnifyingGlass" width={21} height={21} strokeWidth={0.1} />
      </Button>
    </>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={24} height={24} strokeWidth={0.01} />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart } = useCart();
  const totalItems = cart.value?.items.length || null;

  return (
    <Button
      variant="icon"
      class="relative mr-2"
      aria-label="open cart"
      disabled={loading.value}
      onClick={() => {
        displayCart.value = true;
      }}
    >
      <Icon id="ShoppingCart" width={24} height={24} strokeWidth={0.1} />
      {totalItems && (
        <span class="absolute leading-none text-[9px] right-[-5px] top-[-2px] rounded-full bg-blue-900 text-white w-4 h-4 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  );
}

function HeaderButton({ variant }: { variant: "cart" | "search" | "menu" }) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default HeaderButton;
