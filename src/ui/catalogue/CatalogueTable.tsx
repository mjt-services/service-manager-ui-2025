import type React from "react";
import type { InstanceTemplate } from "../../type/InstanceTemplate";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const CatalogueTable: React.FC<{
  items: InstanceTemplate[];
  onSelectItem: (item: InstanceTemplate) => void;
  onRemoveItem: (item: InstanceTemplate) => void;
}> = ({ items, onSelectItem, onRemoveItem }) => (
  <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="catalogue table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Disk GB</TableCell>
          <TableCell>Environment Variables</TableCell>
          <TableCell>Exposed Port Mappings</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name} hover onClick={() => onSelectItem(item)}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.image}</TableCell>
            <TableCell>{item.diskGb}</TableCell>
            <TableCell>{item.env ? JSON.stringify(item.env) : ""}</TableCell>
            <TableCell>
              {item.exposedPortMappings
                ? JSON.stringify(item.exposedPortMappings)
                : ""}
            </TableCell>
            <TableCell>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveItem(item);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
