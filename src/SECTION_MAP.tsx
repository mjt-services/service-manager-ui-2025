import { CatalogueDisplay } from "./ui/catalogue/CatalogueDisplay";
import { ConfigButton } from "./ui/ConfigButton";
import { VastaiMarketDisplay } from "./VastaiMarketDisplay";

export const SECTION_MAP = {
  home: <>HOME</>,
  log: <>LOG</>,
  config: <ConfigButton />,
  market: <VastaiMarketDisplay />,
  catalogue: <CatalogueDisplay />,
};
