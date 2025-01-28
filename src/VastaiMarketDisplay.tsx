import type { VastAiSearchResponse } from "@mjt-services/vastai-common-2025";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { getConnection } from "./connection/Connections";
import VastAiContractsTable from "./ui/VastAiContractsTable";

export const VastaiMarketDisplay = () => {
  const [contracts, setContracts] = useState<VastAiSearchResponse>([]);

  const updateContracts = async () => {
    const con = await getConnection();
    const resp: VastAiSearchResponse = await con.request({
      subject: "vastai.search",
      request: {
        body: {
          query: "compute_cap > 610 total_flops > 5 datacenter=True dph < 0.2",
        },
      },
    });
    console.log(resp);
    setContracts(resp);
  };
  useEffect(() => {
    updateContracts();
  }, []);
  return (
    <Stack spacing={2} alignItems="center">
      <Button
        variant="contained"
        onClick={async () => {
          updateContracts();
        }}
      >
        Refresh
      </Button>
      <VastAiContractsTable data={contracts} />
    </Stack>
  );
};
