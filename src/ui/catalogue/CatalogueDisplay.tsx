import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import type { InstanceTemplate } from "../../type/InstanceTemplate";
import { AddItemForm } from "./AddItemForm";
import { CatalogueTable } from "./CatalogueTable";
import { EditItemForm } from "./EditItemForm";
import { Idbs } from "@mjt-engine/idb";
import { CatalogueItemsIdb } from "../../state/CatalogueItemsIdb";
import { isDefined } from "@mjt-engine/object";

export const CatalogueDisplay: React.FC = () => {
  const [items, setItems] = useState<InstanceTemplate[]>([]);
  const [selectedItem, setSelectedItem] = useState<InstanceTemplate | null>(null);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemImage, setNewItemImage] = useState<string>("");

  React.useEffect(() => {
    Idbs.list(CatalogueItemsIdb).then(async (keys) => {
      const items = (
        await Promise.all(keys.map((key) => Idbs.get(CatalogueItemsIdb, key)))
      ).filter(isDefined);
      setItems(items);
    });
  }, []);

  const handleSelectItem = (item: InstanceTemplate) => {
    setSelectedItem(item);
  };

  const handleRemoveItem = async (item: InstanceTemplate) => {
    setItems(items.filter((i) => i !== item));

    await Idbs.remove(CatalogueItemsIdb, item.name);
  };

  const handleAddItem = async () => {
    const newItem: InstanceTemplate = {
      name: newItemName,
      image: newItemImage,
      diskGb: 0,
      env: {},
      exposedPortMappings: {},
    };
    await Idbs.put(CatalogueItemsIdb, newItemName, newItem);
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemImage("");
  };

  const handleUpdateItem = async (updatedItem: InstanceTemplate) => {
    setItems(
      items.map((item) => (item.name === updatedItem.name ? updatedItem : item))
    );
    await Idbs.put(CatalogueItemsIdb, updatedItem.name, updatedItem);
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
