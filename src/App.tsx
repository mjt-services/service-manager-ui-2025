import { ConfigButton } from "./ui/ConfigButton";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import { getConnection } from "./connection/Connections";
import type { VastAiSearchResponse } from "@mjt-services/vastai-common-2025";
import { VastAiContractsTable } from "./ui/VastAiContractsTable";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  const [active, setActive] = useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <h1>Service Manager</h1>
        <ConfigButton />
        <VastaiMarketDisplay />
      </Box>
    </ThemeProvider>
  );
};

export const VastaiMarketDisplay = () => {
  const [contracts, setContracts] = useState<VastAiSearchResponse>([]);
  return (
    <Stack spacing={2} alignItems="center">
      <Button
        variant="contained"
        onClick={async () => {
          const con = await getConnection();
          const resp: VastAiSearchResponse = await con.request({
            subject: "vastai.search",
            request: {
              body: {
                query:
                  "compute_cap > 610 total_flops > 5 datacenter=True dph < 0.2",
              },
            },
          });
          console.log(resp);
          setContracts(resp);
        }}
      >
        Refresh
      </Button>
      <VastAiContractsTable data={contracts} />
    </Stack>
  );
};
