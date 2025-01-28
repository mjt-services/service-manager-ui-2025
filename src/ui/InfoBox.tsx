import { Typography } from "@mui/material";

export const InfoBox: React.FC<{
  title: string;
  value: string | number;
  unit?: string;
  bold?: boolean;
}> = ({ title, value, unit, bold }) => (
  <Typography variant="body2" sx={bold ? { fontWeight: "bold" } : {}}>
    <strong>{title}:</strong> {value} {unit}
  </Typography>
);
