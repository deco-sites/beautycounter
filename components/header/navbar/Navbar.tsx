import NavbarExpanded from "./NavbarExpanded.tsx";
import NavbarCollapsed from "./NavbarCollapsed.tsx";
import type { NavItem as Item } from "./interfaces.ts";

const item: Item[] = [
  { label: "Sale", href: "/brindes" },
  { label: "Feminino", href: "/feminino" },
  { label: "Masculino", href: "/masculino" },
];

function Navbar({ items = item }: { items: Item[] }) {
  return (
    <>
      <div class="lg:hidden block">
        <NavbarCollapsed />
      </div>

      <div class="hidden lg:block">
        <NavbarExpanded items={items} />
      </div>
    </>
  );
}

export default Navbar;
