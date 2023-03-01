import Icon from "$store/components/ui/Icon.tsx";
import HeaderButton from "$store/islands/HeaderButton.tsx";

function NavbarMobile() {
  return (
    <div class="lg:hidden flex flex-row justify-between items-center h-[53px] border-b-1 border-default w-full px-4 gap-4">
      <div class="flex gap-6">
        <HeaderButton variant="menu" />
        <div />
      </div>

      <a href="/" aria-label="Store logo">
        <Icon id="Logo" width="auto" height={28} />
      </a>

      <div class="flex gap-6">
        <HeaderButton variant="search" />
        <HeaderButton variant="cart" />
      </div>
    </div>
  );
}

export default NavbarMobile;
