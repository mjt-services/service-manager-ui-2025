import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import type { InstanceTemplate } from "../../type/InstanceTemplate";
import { CatalogueTable } from "./CatalogueTable";
import { EditItemForm } from "./EditItemForm";

export const AddItemForm: React.FC<{
  newItemName: string;
  newItemImage: string;
  onNewItemNameChange: (name: string) => void;
  onNewItemImageChange: (image: string) => void;
  onAddItem: () => void;
}> = ({
  newItemName,
  newItemImage,
  onNewItemNameChange,
  onNewItemImageChange,
  onAddItem,
}) => (
  <Box display="flex" alignItems="center">
    <TextField
      label="New Item Name"
      value={newItemName}
      onChange={(e) => onNewItemNameChange(e.target.value)}
      margin="normal"
      fullWidth
    />
    <TextField
      label="New Item Image"
      value={newItemImage}
      onChange={(e) => onNewItemImageChange(e.target.value)}
      margin="normal"
      fullWidth
    />
    <IconButton color="primary" onClick={onAddItem}>
      <AddIcon />
    </IconButton>
  </Box>
);
