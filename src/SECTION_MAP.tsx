import { CatalogueDisplay } from "./ui/catalogue/CatalogueDisplay";
import { ConfigButton } from "./ui/ConfigButton";
import { InstanceSection } from "./ui/instance/InstancesSection";
import { VastaiMarketDisplay } from "./VastaiMarketDisplay";

export const SECTION_MAP = {
  home: <>HOME</>,
  log: <>LOG</>,
  config: <ConfigButton />,
  market: <VastaiMarketDisplay />,
  catalogue: <CatalogueDisplay />,
  instances: <InstanceSection />,
};
