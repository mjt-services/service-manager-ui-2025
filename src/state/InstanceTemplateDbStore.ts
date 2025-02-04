import { DbStore } from "@mjt-services/data-common-2025";
import type { InstanceTemplate } from "../type/InstanceTemplate";

export const InstanceTemplateDbStore: DbStore<InstanceTemplate> = {
  dbName: "template",
  storeName: "instance",
};
