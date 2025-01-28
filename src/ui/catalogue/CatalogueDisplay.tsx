import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import type { CatalogueItem } from "../../type/CatalogueItem";
import { AddItemForm } from "./AddItemForm";
import { CatalogueTable } from "./CatalogueTable";
import { EditItemForm } from "./EditItemForm";

export const CatalogueDisplay: React.FC = () => {
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemImage, setNewItemImage] = useState<string>("");

  const handleSelectItem = (item: CatalogueItem) => {
    setSelectedItem(item);
  };

  const handleRemoveItem = (item: CatalogueItem) => {
    setItems(items.filter((i) => i !== item));
  };

  const handleAddItem = () => {
    const newItem: CatalogueItem = {
      name: newItemName,
      image: newItemImage,
      diskGb: 0,
      env: {},
      exposedPortMappings: {},
    };
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemImage("");
  };

  const handleUpdateItem = (updatedItem: CatalogueItem) => {
    setItems(
      items.map((item) => (item.name === updatedItem.name ? updatedItem : item))
    );
    setSelectedItem(updatedItem);
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Catalogue
        </Typography>
        <AddItemForm
          newItemName={newItemName}
          newItemImage={newItemImage}
          onNewItemNameChange={setNewItemName}
          onNewItemImageChange={setNewItemImage}
          onAddItem={handleAddItem}
        />
      </Box>

      <CatalogueTable
        items={items}
        onSelectItem={handleSelectItem}
        onRemoveItem={handleRemoveItem}
      />

      {selectedItem && (
        <EditItemForm
          selectedItem={selectedItem}
          onUpdateItem={handleUpdateItem}
        />
      )}
    </Container>
  );
};
