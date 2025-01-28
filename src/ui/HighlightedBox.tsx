import { Box } from "@mui/material";
import type React from "react";

export const HighlightedBox: React.FC<{
  children: React.ReactNode;
  style: React.CSSProperties;
}> = ({ children, style }) => (
  <Box sx={{ flex: "1 1 auto", padding: 1, ...style }}>{children}</Box>
);
