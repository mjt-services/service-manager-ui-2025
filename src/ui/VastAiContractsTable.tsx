import type {
  VastAiContract,
  VastAiSearchResponse,
} from "@mjt-services/vastai-common-2025";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { orderBy } from "lodash";
import React, { useEffect, useState } from "react";
import { VastAiContractRow } from "./VastAiContractRow";

export const VastAiContractsTable: React.FC<{ data: VastAiSearchResponse }> = ({
  data,
}) => {
  const [sortCriteria, setSortCriteria] = useState<
    keyof VastAiContract | string
  >("search.totalHour");
  const [sortedData, setSortedData] = useState<VastAiContract[]>([]);

  useEffect(() => {
    const sorted = orderBy(data, [sortCriteria], ["asc"]);
    setSortedData(sorted);
  }, [data, sortCriteria]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortCriteria(event.target.value as keyof VastAiContract);
  };

  return (
    <Box sx={{ padding: 2, height: "100vh", overflowY: "auto" }}>
      <FormControl sx={{ marginBottom: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortCriteria} onChange={handleSortChange}>
          <MenuItem value="search.totalHour">Total Price</MenuItem>
          <MenuItem value="machine_id">Machine ID</MenuItem>
          <MenuItem value="min_bid">Min Bid</MenuItem>
          <MenuItem value="num_gpus">Num GPUs</MenuItem>
          <MenuItem value="reliability">Reliability</MenuItem>
          <MenuItem value="score">Score</MenuItem>
          <MenuItem value="total_flops">Total FLOPS</MenuItem>
          <MenuItem value="cpu_cores">CPU Cores</MenuItem>
          <MenuItem value="cpu_ghz">CPU GHz</MenuItem>
          <MenuItem value="cpu_ram">CPU RAM</MenuItem>
          <MenuItem value="gpu_ram">GPU RAM</MenuItem>
          <MenuItem value="disk_space">Disk Space</MenuItem>
          <MenuItem value="inet_down">Inet Down</MenuItem>
          <MenuItem value="inet_up">Inet Up</MenuItem>
          <MenuItem value="geolocation">Geolocation</MenuItem>
        </Select>
      </FormControl>
      {sortedData.map((contract, index) => (
        <VastAiContractRow key={index} contract={contract} />
      ))}
    </Box>
  );
};

export default VastAiContractsTable;
