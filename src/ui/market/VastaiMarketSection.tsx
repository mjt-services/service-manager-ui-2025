import {
  Stack,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { VastAiSearchResponse } from "@mjt-services/vastai-common-2025";
import type { InstanceTemplate } from "../../type/InstanceTemplate";
import { Idbs } from "@mjt-engine/idb";
import { isDefined } from "@mjt-engine/object";
import { useEffect, useState } from "react";
import { getConnection } from "../../connection/Connections";
import { VastAiContractsTable } from "./VastAiContractsTable";
import { Datas } from "../../data/Datas";
import { InstanceTemplateDbStore } from "../../state/InstanceTemplateDbStore";

export const VastaiMarketSection = () => {
  const [contracts, setContracts] = useState<VastAiSearchResponse>([]);
  const [query, setQuery] = useState<string>(
    "compute_cap > 610 total_flops > 5 datacenter=True dph < 0.2"
  );
  const [instanceTemplates, setInstanceTemplates] = useState<
    InstanceTemplate[]
  >([]);
  const [selectedInstanceTemplate, setSelectedInstanceTemplate] = useState<
    InstanceTemplate | undefined
  >(undefined);

  useEffect(() => {
    updateContracts();
    // Idbs.list(InstanceTemplateIdb).then(async (keys) => {
    //   const items = (
    //     await Promise.all(keys.map((key) => Idbs.get(InstanceTemplateIdb, key)))
    //   ).filter(isDefined);
    //   setInstanceTemplates(items);
    // });
    Datas.list({ dbStore: InstanceTemplateDbStore }).then(async (keys) => {
      console.log("keys", keys);
      const items = (
        await Promise.all(
          keys.map((key) =>
            Datas.get<InstanceTemplate>({
              dbStore: InstanceTemplateDbStore,
              key,
            })
          )
        )
      ).filter(isDefined);
      console.log("items", items);
      setInstanceTemplates(items);
    });
  }, []);

  const updateContracts = async () => {
    const con = await getConnection();
    const resp: VastAiSearchResponse = await con.request({
      subject: "vastai.search",
      request: {
        body: {
          query: query,
        },
      },
    });
    console.log(resp);
    setContracts(resp);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <TextField
        sx={{ minWidth: "80ch" }}
        label="Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      <FormControl sx={{ minWidth: "20ch" }}>
        <InputLabel id="catalogue-item-select-label">Template</InputLabel>
        <Select
          labelId="catalogue-item-select-label"
          value={selectedInstanceTemplate?.name || ""}
          onChange={(e) => {
            const selectedItem = instanceTemplates.find(
              (item) => item.name === e.target.value
            );
            setSelectedInstanceTemplate(selectedItem);
          }}
          autoWidth
        >
          {instanceTemplates.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name} - {item.image}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={async () => {
          updateContracts();
        }}
      >
        Update Contracts
      </Button>
      {selectedInstanceTemplate && (
        <VastAiContractsTable
          contracts={contracts}
          instanceTemplate={selectedInstanceTemplate}
        />
      )}
    </Stack>
  );
};
