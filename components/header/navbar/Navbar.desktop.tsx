import { NavItem } from "./NavItem.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { NavItem as Item } from "./interfaces.ts";
import HeaderButton from "$store/islands/HeaderButton.tsx";

function NavbarDesktop({ items }: { items: Item[] }) {
  return (
    <div class="hidden lg:flex flex-col">
      <div class="flex flex-row justify-between items-center w-full py-4 px-12">
        <div class="flex flex-1" />

        <a href="/" class="flex flex-1 justify-center" aria-label="Store logo">
          <Icon id="Logo" height={55} />
        </a>

        <div class="flex flex-1 items-center justify-end gap-6">
          <HeaderButton variant="search" />

          <a href="/login" aria-label="Log in">
            <Icon id="User" width={24} height={24} strokeWidth={0.4} />
          </a>

          <HeaderButton variant="cart" />
        </div>
      </div>

      <div class="flex-grow gap-1 flex justify-center">
        {items.map(NavItem)}
      </div>
    </div>
  );
}

export default NavbarDesktop;
