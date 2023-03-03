import type { JSX } from "preact";

/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

interface Abbreviation {
  variant: "abbreviation";
  content: string;
}

interface Color {
  variant: "color";
  content: keyof typeof colors;
}

interface Idempotent {
  variant: "idempotent";
  content: string;
}

const colors = {
  "azul-clara": "#87CEFA",
  "azul-marinho": "#000080",
  "branca": "#FFFFFF",
  "cinza": "#808080",
  "cinza-escura": "#A9A9A9",
  "laranja": "#FFA500",
  "marrom": "#A52A2A",
  "preta": "#000000",
  "verde-clara": "#90EE90",
  "vermelha": "#FF0000",
};

type Props =
  & JSX.IntrinsicElements["button"]
  & (Abbreviation | Color | Idempotent)
  & { active?: boolean };

function Avatar(props: Props) {
  const { variant, content, active, class: _class = "", ...btnProps } = props;

  if (variant === "color") {
    const borderColor = active ? "border-gray-600" : "border-transparent";

    return (
      <div
        class={`border-2 hover:border-default ${borderColor} rounded-full w-6 h-6 flex items-center justify-center`}
      >
        <button
          {...btnProps}
          class={`rounded-full w-4 h-4 ${_class}`}
          style={{ backgroundColor: colors[content] ?? "#FFF" }}
        />
      </div>
    );
  }

  if (variant === "abbreviation") {
    const activeClasses = active
      ? "bg-primary-dark text-white border-primary-dark"
      : "border-default text-gray-500";

    return (
      <button
        {...btnProps}
        class={`focus:outline-none text-xs rounded-full border-1 ${activeClasses} hover:border-black w-6 h-6 flex justify-center items-center disabled:bg-interactive-default disabled:text-interactive-default ${_class}`}
      >
        <span class="absolute">{content.substring(0, 2)}</span>
      </button>
    );
  }

  return <button {...btnProps} class={_class}>{content}</button>;
}

export default Avatar;
