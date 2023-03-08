import type { AlertStyle } from "./interfaces.ts";

const ALERT_COLORS: Record<
  AlertStyle,
  { background: string; text: string; buttonTheme: "dark" | "light" }
> = {
  dark: {
    background: "bg-primary-dark",
    text: "text-interactive-default",
    buttonTheme: "light",
  },
  "decorative-one": {
    background: "bg-decorative-one",
    text: "text-interactive-default",
    buttonTheme: "light",
  },
  "decorative-two": {
    background: "bg-decorative-two",
    text: "text-default",
    buttonTheme: "dark",
  },
  "decorative-three": {
    background: "bg-decorative-three",
    text: "text-default",
    buttonTheme: "dark",
  },
  "decorative-four": {
    background: "bg-decorative-four",
    text: "text-interactive-default",
    buttonTheme: "light",
  },
  "decorative-five": {
    background: "bg-decorative-five",
    text: "text-default",
    buttonTheme: "dark",
  },
};

export const getAlertTextColor = (style: AlertStyle) =>
  ALERT_COLORS[style]?.text;

export const getAlertBackground = (style: AlertStyle) =>
  ALERT_COLORS[style]?.background;

export const getAlertButtonTheme = (style: AlertStyle): "dark" | "light" =>
  ALERT_COLORS[style]?.buttonTheme;
