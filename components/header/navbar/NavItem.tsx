import { NavItem } from "./interfaces.ts";
import { LinkList } from "./LinkList.tsx";
import { Picture } from "$live/std/ui/components/Picture.tsx";

export function NavItem(props: NavItem) {
  const { href, label, children, featured, image } = props;

  const megaMenuTitleClasses = "uppercase text-xs font-bold tracking-widest";

  const renderImage = () => {
    if (!image) return null;

    return (
      <a href="/" class="w-[275px] h-[225px]">
        <Picture class="w-full block">
          <img src={image} alt={label} class="object-cover w-full" />
        </Picture>
      </a>
    );
  };

  const renderChildren = () => {
    if (!children || !children.length) return null;

    return (
      <div class="w-[376px] border-r-1 mx-12">
        <span class={megaMenuTitleClasses}>
          {label}
        </span>

        <LinkList links={children} />
      </div>
    );
  };

  const renderShop = () => (
    <div>
      <span class={megaMenuTitleClasses}>
        Shop
      </span>

      <LinkList
        links={[
          { href: "/", label: "New" },
          { href: "/", label: "Best Sellers" },
          { href: "/", label: "Last Chance" },
        ]}
      />
    </div>
  );

  const renderFeatured = () => {
    if (!featured || !featured.length) return null;

    return (
      <div>
        <span class={megaMenuTitleClasses}>
          Featured
        </span>

        <LinkList links={featured} />
      </div>
    );
  };

  return (
    <div class="group px-6 py-2">
      <a
        href={href}
        class="text-sm py-2 border-b-2 border-white group-hover:border-black"
      >
        {label}
      </a>

      <div class="hidden absolute w-full left-0 mt-2 border-t-1 shadow-md flex-row px-24 py-6 group-hover:flex">
        {renderImage()}
        {renderChildren()}
        {renderShop()}
        {renderFeatured()}

        {/* condenser */}
        <div class="flex flex-1" />
      </div>
    </div>
  );
}
