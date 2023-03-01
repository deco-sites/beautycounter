import { forwardRef } from "preact/compat";

import type { ComponentType, JSX } from "preact";

import Spinner from "./Spinner.tsx";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "as" | "size" | "loading">
  & {
    as?: keyof JSX.IntrinsicElements | ComponentType;
    variant?: keyof typeof variants;
    theme?: "dark" | "light";
    size?: "large" | "small";
    loading?: boolean;
  };

const variants = {
  default: {
    base: "font-bold border-transparent disabled:dark-interactive-default",
    dark: "bg-dark-interactive-default text-interactive-default",
    light: "text-dark-interactive-default bg-interactive-default",
    large: "py-4 px-12 text-xs uppercase",
    small: "text-xs py-0.5 px-6 uppercase",
  },
  quiet: {
    base: "uppercase font-medium",
    dark: "border-dark-interactive-default text-dark-interactive-default",
    light: "border-interactive-default text-interactive-default",
    large: "py-4 px-12 font-bold text-xs",
    small: "text-xs py-0.5 px-6",
  },
  icon: {
    base: "text-default border-transparent disabled:opacity-50 bg-transparent",
    dark: "",
    light: "",
    large: "",
    small: "",
  },
};

const Button = forwardRef<HTMLButtonElement, Props>(({
  variant = "default",
  size = "large",
  theme = "dark",
  as = "button",
  class: _class = "",
  children,
  loading,
  ...props
}, ref) => {
  const Component = as as ComponentType;
  const variantStyles = variants[variant];

  const styles = [
    variantStyles.base,
    variantStyles[size],
    variantStyles[theme],
  ].join(" ");

  return (
    <Component
      className={`whitespace-nowrap tracking-widest	inline-flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150 ease-in border-1 focus:outline-none ${styles} ${_class}`}
      {...props}
      ref={ref}
    >
      {loading === true ? <Spinner size={20} /> : children}
    </Component>
  );
});

export default Button;
