import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Container from "$store/components/ui/Container.tsx";

export interface Feature {
  /**
   * @description Image src
   */
  icon: AvailableIcons;
  /**
   * @description Title
   */
  title: string;
  /**
   * @description Description and Image alt text
   */
  description: string;
}

export interface Props {
  title: string;
  description: string;
  features: Feature[];
}

function FeatureHighlights(props: Props) {
  const { features, title, description } = props;
  return (
    <Container class="min-h-[280px] px-6 py-12 md:px-10 md:py-20 flex items-center justify-center flex-col">
      <h3 class="font-title text-7xl text-center">{title}</h3>
      <p class="max-w-[950px] text-center mt-6 text-lg">{description}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 justify-items-center mt-16">
        {features.map(({ icon: id = "Truck", title, description }) => (
          <div class="group flex flex-col gap-4 items-center lg:max-w-[230px]">
            <Icon
              id={id}
              width={100}
              height={100}
              strokeWidth={0.5}
              class="text-default group-hover:scale-110 transition-all"
            />

            <div class="flex flex-col gap-2 text-center">
              <Text variant="heading-strong" class="text-2xl">
                {title}
              </Text>

              <Text tone="subdued" class="text-sm">
                {description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default FeatureHighlights;
