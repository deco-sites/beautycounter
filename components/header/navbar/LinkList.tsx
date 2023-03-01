import { NavLink } from "./interfaces.ts";
type Props = { links: NavLink[] };

export function LinkList(props: Props) {
  const { links } = props;
  const megaMenuLinkClasses = "py-2 text-sm hover:font-bold";

  return (
    <ul class="flex flex-wrap flex-col h-[300px] flex-auto max-w-[376px]">
      {links.map((link, i) => (
        <li key={`${link.label}-${i}`} class="max-w-[140px] mr-12 my-1">
          <a href={link.href} class={megaMenuLinkClasses}>{link.label}</a>
        </li>
      ))}
    </ul>
  );
}
