import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import type { InstanceTemplate } from "../../type/InstanceTemplate";
import { AddItemForm } from "./AddItemForm";
import { TemplateTable } from "./TemplateTable";
import { EditItemForm } from "./EditItemForm";
import { Idbs } from "@mjt-engine/idb";
import { InstanceTemplateIdb } from "../../state/InstanceTemplateIdb";
import { isDefined } from "@mjt-engine/object";

export const TemplateSection: React.FC = () => {
  const [items, setItems] = useState<InstanceTemplate[]>([]);
  const [selectedItem, setSelectedItem] = useState<InstanceTemplate | null>(
    null
  );
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemImage, setNewItemImage] = useState<string>("");

  React.useEffect(() => {
    Idbs.list(InstanceTemplateIdb).then(async (keys) => {
      const items = (
        await Promise.all(keys.map((key) => Idbs.get(InstanceTemplateIdb, key)))
      ).filter(isDefined);
      setItems(items);
    });
  }, []);

  const handleSelectItem = (item: InstanceTemplate) => {
    setSelectedItem(item);
  };

  const handleRemoveItem = async (item: InstanceTemplate) => {
    setItems(items.filter((i) => i !== item));

    await Idbs.remove(InstanceTemplateIdb, item.name);
  };

  const handleAddItem = async () => {
    const newItem: InstanceTemplate = {
      name: newItemName,
      image: newItemImage,
      diskGb: 10,
      env: {},
      exposedPortMappings: {},
    };
    await Idbs.put(InstanceTemplateIdb, newItemName, newItem);
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemImage("");
  };

  const handleUpdateItem = async (updatedItem: InstanceTemplate) => {
    setItems(
      items.map((item) => (item.name === updatedItem.name ? updatedItem : item))
    );
    await Idbs.put(InstanceTemplateIdb, updatedItem.name, updatedItem);
    setSelectedItem(updatedItem);
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Instance Templates
        </Typography>
        <AddItemForm
          newItemName={newItemName}
          newItemImage={newItemImage}
          onNewItemNameChange={setNewItemName}
          onNewItemImageChange={setNewItemImage}
          onAddItem={handleAddItem}
        />
      </Box>

      <TemplateTable
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
