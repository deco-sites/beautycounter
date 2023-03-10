import Icon from "$store/components/ui/Icon.tsx";
import HeaderButton from "$store/islands/HeaderButton.tsx";

function NavbarCollapsed() {
  return (
    <div class="bg-default flex flex-row justify-between items-center h-[53px] border-b-1 border-default w-full px-4 gap-4">
      <div class="flex gap-6">
        <HeaderButton variant="menu" />
        <div />
      </div>

      <a href="/" class="w-min" aria-label="Store logo">
        <Icon id="Logo" width={124} height={28} />
      </a>

      <div class="flex gap-6">
        <HeaderButton variant="search" />
        <HeaderButton variant="cart" />
      </div>
    </div>
  );
}

export default NavbarCollapsed;
