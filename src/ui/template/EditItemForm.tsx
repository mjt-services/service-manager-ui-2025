import {
  Box,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import type { InstanceTemplate } from "../../type/InstanceTemplate";

export const EditItemForm: React.FC<{
  selectedItem: InstanceTemplate;
  onUpdateItem: (updatedItem: InstanceTemplate) => void;
}> = ({ selectedItem, onUpdateItem }) => (
  <Box mt={4}>
    <Typography variant="h5" gutterBottom>
      Edit Item
    </Typography>
    <TextField
      label="Name"
      name="name"
      value={selectedItem.name}
      onChange={(e) => onUpdateItem({ ...selectedItem, name: e.target.value })}
      margin="normal"
      fullWidth
    />
    <TextField
      label="Image"
      name="image"
      value={selectedItem.image}
      onChange={(e) => onUpdateItem({ ...selectedItem, image: e.target.value })}
      margin="normal"
      fullWidth
    />
    <TextField
      label="Target Port"
      name="targetPort"
      value={selectedItem.targetPort}
      onChange={(e) =>
        onUpdateItem({ ...selectedItem, targetPort: parseInt(e.target.value) })
      }
      margin="normal"
      fullWidth
    />
    <TextField
      label="On Start Command"
      name="onStartCmd"
      value={selectedItem.onStartCmd}
      onChange={(e) =>
        onUpdateItem({ ...selectedItem, onStartCmd: e.target.value })
      }
      margin="normal"
      fullWidth
    />
    <TextField
      label="Disk GB"
      name="diskGb"
      value={selectedItem.diskGb}
      onChange={(e) =>
        onUpdateItem({ ...selectedItem, diskGb: parseInt(e.target.value) })
      }
      margin="normal"
      fullWidth
    />
    <TextField
      label="Environment Variables"
      name="env"
      value={selectedItem.env ? JSON.stringify(selectedItem.env) : ""}
      onChange={(e) =>
        onUpdateItem({ ...selectedItem, env: JSON.parse(e.target.value) })
      }
      margin="normal"
      fullWidth
    />
    <TextField
      label="Exposed Port Mappings"
      name="exposedPortMappings"
      value={
        selectedItem.exposedPortMappings
          ? JSON.stringify(selectedItem.exposedPortMappings)
          : ""
      }
      onChange={(e) =>
        onUpdateItem({
          ...selectedItem,
          exposedPortMappings: JSON.parse(e.target.value),
        })
      }
      margin="normal"
      fullWidth
    />
  </Box>
);
