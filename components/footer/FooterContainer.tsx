import type { ComponentChildren } from "preact";
type Props = { class?: string; children: ComponentChildren };

export default function FooterContainer(props: Props) {
  const { children, class: _class = "" } = props;
  return <div class={`py-6 px-4 lg:py-12 lg:px-6 ${_class}`}>{children}</div>;
}
