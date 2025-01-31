import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";

export type InstanceTemplate = {
  name: string;
  targetPort?: number;
  onStartCmd?: string;
} & Omit<
  VastaiConnectionMap["vastai.create.instance"]["request"]["body"],
  "contractId"
>;
