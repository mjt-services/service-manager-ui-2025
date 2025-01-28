import { Idb } from "@mjt-engine/idb";

export const AppConfigIdb: Idb<{ authToken: string }> = {
  dbName: "service-manager-ui-2025",
  storeName: "config",
};
