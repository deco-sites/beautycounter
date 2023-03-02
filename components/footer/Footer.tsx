import Support from "./Support.tsx";
import { Props } from "./interfaces.ts";
import Newsletter from "./Newsletter.tsx";
import FooterSection from "./FooterSection.tsx";
import Text from "$store/components/ui/Text.tsx";
import FooterContainer from "./FooterContainer.tsx";
import Container from "$store/components/ui/Container.tsx";

function Footer(props: Props) {
  const { sections, finalText, newsletter } = props;

  return (
    <footer class="w-full flex flex-col divide-y-1 divide-default border-t-1">
      <Container class="w-full flex flex-col lg:flex-row">
        <FooterContainer class="order-2 lg:order-1">
          <Support />
        </FooterContainer>

        <FooterContainer class="border-y-1 lg:border-x-1 lg:border-y-0 order-3 lg:order-2">
          <ul class="flex flex-col sm:flex-row gap-20">
            {sections.map(FooterSection)}
          </ul>
        </FooterContainer>

        <FooterContainer class="order-1 lg:order-3">
          <Newsletter {...newsletter} />
        </FooterContainer>
      </Container>

      <Container class="w-full">
        <div class="py-6 flex justify-center w-full">
          <Text variant="caption-regular" tone="default">
            {finalText}
          </Text>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
