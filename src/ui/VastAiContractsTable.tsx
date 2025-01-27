import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, useTheme, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { orderBy } from "lodash";
import type { VastAiContract, VastAiSearchResponse } from "@mjt-services/vastai-common-2025";

const formatFloat = (value: number, decimals: number = 2) => value.toFixed(decimals);

const InfoBox: React.FC<{ title: string; value: string | number; unit?: string; bold?: boolean }> = ({ title, value, unit, bold }) => (
  <Typography variant="body2" sx={bold ? { fontWeight: 'bold' } : {}}>
    <strong>{title}:</strong> {value} {unit}
  </Typography>
);

const HighlightedBox: React.FC<{ children: React.ReactNode; style: React.CSSProperties }> = ({ children, style }) => (
  <Box sx={{ flex: "1 1 auto", padding: 1, ...style }}>
    {children}
  </Box>
);

const VastAiContractRow: React.FC<{ contract: VastAiContract }> = ({ contract }) => {
  const theme = useTheme();
  const highlightStyles = [
    { backgroundColor: theme.palette.primary.dark },
    { backgroundColor: theme.palette.secondary.dark },
    { backgroundColor: theme.palette.success.dark },
    { backgroundColor: theme.palette.warning.dark },
    { backgroundColor: theme.palette.info.dark },
  ];

  return (
    <Paper
      sx={{
        padding: 2,
        marginBottom: 2,
        border: "1px solid #ccc",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <HighlightedBox style={highlightStyles[0]}>
          <InfoBox title="Total Price" value={`$${formatFloat(contract.search.totalHour)}`} unit="/ hour" bold />
          <InfoBox title="Machine ID" value={contract.machine_id} />
          <InfoBox title="Min Bid" value={`$${formatFloat(contract.min_bid)}`} />
          <InfoBox title="Num GPUs" value={contract.num_gpus} />
          <InfoBox title="OS Version" value={contract.os_version} />
          <InfoBox title="PCI Gen" value={contract.pci_gen} />
          <InfoBox title="PCIE BW" value={formatFloat(contract.pcie_bw)} unit="GB/s" />
        </HighlightedBox>
        <HighlightedBox style={highlightStyles[1]}>
          <InfoBox title="GPU Name" value={contract.gpu_name} bold />
          <InfoBox title="Reliability" value={formatFloat(contract.reliability)} />
          <InfoBox title="Reliability2" value={formatFloat(contract.reliability2)} />
          <InfoBox title="Reliability Mult" value={formatFloat(contract.reliability_mult)} />
          <InfoBox title="Rentable" value={contract.rentable ? 'Yes' : 'No'} />
          <InfoBox title="Rented" value={contract.rented ? 'Yes' : 'No'} />
          <InfoBox title="Score" value={formatFloat(contract.score)} />
        </HighlightedBox>
        <HighlightedBox style={highlightStyles[2]}>
          <InfoBox title="GPU RAM" value={contract.gpu_ram / 1024} unit="GB" bold />
          <InfoBox title="Start Date" value={new Date(contract.start_date * 1000).toLocaleDateString()} />
          <InfoBox title="Static IP" value={contract.static_ip ? 'Yes' : 'No'} />
          <InfoBox title="Storage Cost" value={`$${formatFloat(contract.storage_cost)}`} unit="/ hour" />
          <InfoBox title="Storage Total Cost" value={`$${formatFloat(contract.storage_total_cost)}`} />
          <InfoBox title="Time Remaining" value={contract.time_remaining} />
          <InfoBox title="Total FLOPS" value={formatFloat(contract.total_flops)} unit="TFLOPS" />
        </HighlightedBox>
        <HighlightedBox style={highlightStyles[3]}>
          <InfoBox title="CPU Name" value={contract.cpu_name} />
          <InfoBox title="CPU Cores" value={contract.cpu_cores} />
          <InfoBox title="CPU GHz" value={formatFloat(contract.cpu_ghz)} unit="GHz" />
          <InfoBox title="CPU RAM" value={contract.cpu_ram / 1024} unit="GB" />
          <InfoBox title="GPU Total RAM" value={contract.gpu_total_ram / 1024} unit="GB" />
        </HighlightedBox>
        <HighlightedBox style={highlightStyles[4]}>
          <InfoBox title="Disk Space" value={contract.disk_space} unit="GB" />
          <InfoBox title="Disk Name" value={contract.disk_name} />
          <InfoBox title="Geolocation" value={contract.geolocation} />
          <InfoBox title="Hostname" value={contract.hostname ?? 'N/A'} />
          <InfoBox title="Inet Down" value={contract.inet_down} unit="Mbps" />
          <InfoBox title="Inet Up" value={contract.inet_up} unit="Mbps" />
          <InfoBox title="Inet Down Cost" value={`$${formatFloat(contract.inet_down_cost)}`} unit="/ TB" />
          <InfoBox title="Inet Up Cost" value={`$${formatFloat(contract.inet_up_cost)}`} unit="/ TB" />
        </HighlightedBox>
      </Box>
    </Paper>
  );
};

export const VastAiContractsTable: React.FC<{ data: VastAiSearchResponse }> = ({ data }) => {
  const [sortCriteria, setSortCriteria] = useState<keyof VastAiContract>('search.totalHour');
  const [sortedData, setSortedData] = useState<VastAiContract[]>([]);

  useEffect(() => {
    const sorted = orderBy(data, [sortCriteria], ['asc']);
    setSortedData(sorted);
  }, [data, sortCriteria]);

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortCriteria(event.target.value as keyof VastAiContract);
  };

  return (
    <Box sx={{ padding: 2, height: '100vh', overflowY: 'auto' }}>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
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