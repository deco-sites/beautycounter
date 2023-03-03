import Modals from "$store/islands/HeaderModals.tsx";
import type { EditableAlert } from "./alert/Alert.tsx";
import type { LoaderReturnType } from "$live/std/types.ts";
import type { Product } from "$live/std/commerce/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";

import Navbar from "./navbar/Navbar.tsx";
import HeaderHelper from "$store/islands/HeaderHelper.tsx";
import type { NavItem as Item } from "./navbar/interfaces.ts";

export interface Props {
  /**
   * @title Alerts
   */
  alerts: EditableAlert[];

  /** @title Search Bar */
  searchbar?: SearchbarProps;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems: Item[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[]>;
}

function Header({ alerts, searchbar, products, navItems }: Props) {
  return (
    <header class="lg:h-[127px] h-[53px]">
      <HeaderHelper alerts={alerts} />

      <div class="mt-[40px] relative z-20">
        <Navbar items={navItems} />
      </div>

      <Modals
        menu={{ items: navItems }}
        searchbar={{ ...searchbar, products }}
      />
    </header>
  );
}

export default Header;
