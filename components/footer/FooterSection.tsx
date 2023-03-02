import { isIcon } from "./helpers.ts";
import SectionItem from "./SectionItem.tsx";
import { Item, Section } from "./interfaces.ts";
import Text from "$store/components/ui/Text.tsx";

export default function FooterSection(section: Section) {
  const iconClass = isIcon(section.children[0]) ? "flex-row" : "flex-col";

  const renderItem = (item: Item) => (
    <li>
      <SectionItem item={item} />
    </li>
  );

  return (
    <li>
      <div>
        <Text variant="caption-strong" class="uppercase" tone="default">
          {section.label}
        </Text>

        <ul class={`flex ${iconClass} gap-2 pt-2`}>
          {section.children.map(renderItem)}
        </ul>
      </div>
    </li>
  );
}
