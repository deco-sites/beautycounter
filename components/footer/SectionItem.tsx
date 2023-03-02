import { isIcon } from "./helpers.ts";
import { Item } from "./interfaces.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";

export default function SectionItem({ item }: { item: Item }) {
  return (
    <Text
      tone="default"
      variant="caption-regular"
    >
      {isIcon(item)
        ? (
          <div class="border-default border-1 py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href} class="hover:underline">
            {item.label}
          </a>
        )}
    </Text>
  );
}
