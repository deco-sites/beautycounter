export type AlertStyle =
  | "dark"
  | "decorative-one"
  | "decorative-two"
  | "decorative-three"
  | "decorative-four"
  | "decorative-five";

export interface EditableAlert {
  /**
   * @title Text
   * @description The text to display in the alert
   */
  text: string;

  /**
   * @title Style
   * @description The style to use for this alert
   */
  style: AlertStyle;

  /**
   * @title Action text
   * @description The text to display in the alert call to action
   */
  cta?: string;
}

export interface Props {
  alerts: EditableAlert[];
}
