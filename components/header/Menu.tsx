import { NavItem } from "./navbar/interfaces.ts";

export interface Props {
  items: NavItem[];
}

function Menu({ items }: Props) {
  return (
    <ul class="flex-grow flex flex-col gap-12 pt-6">
      {items.map((item) => (
        <li>
          <a class="text-black text-base" href={item.href}>{item.label}</a>
          <ul class="ml-0.5">
            {item?.children?.map((child) => (
              <li>
                <a class="text-gray-600 text-sm" href={child.href}>
                  {child.label}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
