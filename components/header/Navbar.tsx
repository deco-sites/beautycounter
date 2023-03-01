import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { ComponentChildren } from "preact";

import type { NavItem as Item } from "./NavItem.ts";

function NavItem({
  href,
  label,
}: { href: string; label: ComponentChildren }) {
  const classes = [
    "py-2",
    "border-b-2",
    "font-normal",
    "border-solid",
    "border-white",
    "hover:border-black",
  ];

  return (
    <a href={href} class={classes.join(" ")}>
      {label}
    </a>
  );
}

function Navbar({ items }: {
  items: Item[];
}) {
  return (
    <>
      {/* Mobile Version */}
      <div class="md:hidden flex flex-row justify-between items-center h-[53px] border-b-1 border-default w-full px-4 gap-4">
        <HeaderButton variant="menu" />

        <a href="/" class="flex-grow" aria-label="Store logo">
          <Icon id="Logo" width={87.5} height={28} />
        </a>

        <div class="flex gap-6">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col">
        <div class="flex flex-row justify-between items-center w-full py-4 px-12">
          <div class="flex flex-1" />
          <a
            href="/"
            class="flex flex-1 justify-center"
            aria-label="Store logo"
          >
            <Icon id="Logo" height={55} />
          </a>
          <div class="flex flex-1 items-center justify-end gap-6">
            <HeaderButton variant="search" />
            <a href="/login" aria-label="Log in">
              <Icon id="User" width={20} height={20} strokeWidth={0.4} />
            </a>
            <HeaderButton variant="cart" />
          </div>
        </div>

        <div class="flex-grow flex gap-6 justify-center">
          {items.map((item) => <NavItem {...item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
