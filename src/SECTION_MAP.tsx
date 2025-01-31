import { TemplateSection } from "./ui/template/TemplateSection";
import { ConfigButton } from "./ui/ConfigButton";
import { InstanceSection } from "./ui/instance/InstancesSection";
import { VastaiMarketSection } from "./ui/market/VastaiMarketSection";

export const SECTION_MAP = {
  home: <>HOME</>,
  log: <>LOG</>,
  config: <ConfigButton />,
  market: <VastaiMarketSection />,
  template: <TemplateSection />,
  instances: <InstanceSection />,
};
