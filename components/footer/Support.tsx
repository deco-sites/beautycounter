import { isIcon } from "./helpers.ts";
import SectionItem from "./SectionItem.tsx";
import { Item, Section } from "./interfaces.ts";
import Text from "$store/components/ui/Text.tsx";

export default function Support() {
  return (
    <div class="flex flex-col gap-6 lg:max-w-[200px]">
      <div class="flex flex-col gap-2">
        <Text variant="heading-regular">
          Counter Support Hours
        </Text>

        <div class="flex flex-col gap-2">
          <Text variant="body-regular" tone="subdued">
            <b>Mon-Fri</b>: 6AM–4PM PT Phone | LIVE Chat | Email
          </Text>

          <Text variant="body-regular" tone="subdued">
            <b>Saturday</b>: LIVE Chat & Email 6am - 4pm PT
          </Text>

          <Text variant="body-regular" tone="subdued">
            <b>Sunday</b>: 6am - 4pm PT | LIVE Chat | Email
          </Text>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Text variant="heading-regular">
          Press Inquires
        </Text>

        <Text variant="body-regular" tone="subdued">
          press@beautycounter.com
        </Text>
      </div>
    </div>
  );
}
