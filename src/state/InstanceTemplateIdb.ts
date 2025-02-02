import type { Idb } from "@mjt-engine/idb";
import type { InstanceTemplate } from "../type/InstanceTemplate";
import { DbStore } from "@mjt-services/data-common-2025";

export const InstanceTemplateIdb: Idb<InstanceTemplate> = {
  dbName: "service-manager-ui-2025",
  storeName: "instance-templates",
};

export const TemplateInstanceDbStore: DbStore<InstanceTemplate> = {
  dbName: "template",
  storeName: "instance",
};
