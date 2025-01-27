import { Idb } from "@mjt-engine/idb";

export const AppConfig: Idb<{ authToken: string }> = {
  dbName: "service-manager-ui-2025",
  storeName: "config",
};
