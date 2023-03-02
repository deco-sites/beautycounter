import { IconItem, Item } from "./interfaces.ts";

export const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";
