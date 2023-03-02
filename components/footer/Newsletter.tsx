import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { NewsletterProps } from "./interfaces.ts";
import Button from "$store/components/ui/Button.tsx";

function Newsletter(props: NewsletterProps) {
  const { title, description } = props;

  return (
    <div class="flex flex-col items-center gap-6 max-w-[350px]">
      <div class="flex flex-col gap-2">
        <Text variant="heading-regular">{title}</Text>
        <Text variant="caption-regular">{description}</Text>
      </div>

      <div class="flex flex-row items-center font-body-strong text-body-strong w-full">
        <input
          class="h-[52px] flex-grow border-1 border-dark-interactive-default px-2"
          placeholder="Enter your e-mail"
        />

        <Button size="small" class="w-[62px] h-[52px]">
          <Icon
            width={24}
            height={24}
            strokeWidth={2}
            id={"ChevronRight"}
          />
        </Button>
      </div>
    </div>
  );
}

export default Newsletter;
