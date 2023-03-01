import NavbarMobile from "./Navbar.mobile.tsx";
import NavbarDesktop from "./Navbar.desktop.tsx";
import type { NavItem as Item } from "./interfaces.ts";

const item: Item[] = [
  { label: "Sale", href: "/brindes" },
  { label: "Feminino", href: "/feminino" },
  { label: "Masculino", href: "/masculino" },
];

function Navbar({ items = item }: { items: Item[] }) {
  return (
    <>
      <NavbarMobile />
      <NavbarDesktop items={items} />
    </>
  );
}

export default Navbar;
