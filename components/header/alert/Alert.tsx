export * from "./interfaces.ts";

import { useState } from "preact/hooks";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { EditableAlert, Props } from "./interfaces.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

import {
  getAlertBackground,
  getAlertButtonTheme,
  getAlertTextColor,
} from "./helpers.ts";

const messages: EditableAlert[] = [
  { text: "Parcelamento em até 10x no cartão", style: "dark" },
  { text: "Devolução Garantida", style: "decorative-one" },
  { text: "Entrega para todo Brasil", style: "decorative-two" },
  { text: "Pagamento por Pix", style: "decorative-three" },
  { text: "Pagamento por Pix", style: "decorative-four" },
  { text: "Pagamento por Pix", style: "decorative-five" },
];

function Alert({ alerts = messages }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderAlerts = (alert: EditableAlert) => {
    const textColor = getAlertTextColor(alert.style);
    const buttonTheme = getAlertButtonTheme(alert.style);

    return (
      <Text class="flex justify-center items-center h-full text-xs font-bold">
        <span class="w-28"></span>

        <p class={`${textColor} truncate mr-2`}>
          {alert.text}
        </p>

        {alert.cta && (
          <Button size="small" theme={buttonTheme} class="relative z-10">
            {alert.cta}
          </Button>
        )}

        <span class="w-28"></span>
      </Text>
    );
  };

  const renderArrow = (id: AvailableIcons) => {
    const iconColor = getAlertTextColor(alerts[currentIndex].style);

    return (
      <span class={iconColor}>
        <Icon
          id={id}
          width={24}
          height={24}
          strokeWidth={2}
        />
      </span>
    );
  };

  // prepare slider css classes
  const sliderFixedClasses = "flex justify-center relative z-20";
  const sliderBackground = getAlertBackground(alerts[currentIndex].style);
  const sliderClasses = `${sliderBackground} ${sliderFixedClasses}`;

  return (
    <div class={sliderClasses}>
      <Slider
        animationDuration={9999}
        onChange={setCurrentIndex}
        class="pt-10 w-full md:w-10/12"
        leftArrow={renderArrow("ChevronLeft")}
        rightArrow={renderArrow("ChevronRight")}
      >
        {alerts.map(renderAlerts)}
      </Slider>
    </div>
  );
}

export default Alert;
