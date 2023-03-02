import { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type IconItem = { icon: AvailableIcons };

export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

export interface NewsletterProps {
  title: string;
  description: string;
}

export interface Props {
  newsletter: NewsletterProps;
  finalText: string;
  sections: Section[];
}
