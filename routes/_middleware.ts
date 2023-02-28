import { withLive } from "$live/live.ts";

export const handler = withLive({
  siteId: 539,
  site: "beautycounter",
  domains: ["beautycounter.deco.site"],
});