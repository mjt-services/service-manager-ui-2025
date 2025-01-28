import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";

export type CatalogueItem = {
  name: string;
} & Omit<
  VastaiConnectionMap["vastai.create.instance"]["request"]["body"],
  "machineId"
>;
