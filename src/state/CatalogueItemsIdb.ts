import type { Idb } from "@mjt-engine/idb";


export const CatalogueItemsIdb: Idb<{ authToken: string; }> = {
  dbName: "service-manager-ui-2025",
  storeName: "catalog-items",
};
