import { isDefined } from "@mjt-engine/object";
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Datas } from "../../data/Datas";
import { InstanceTemplateDbStore } from "../../state/InstanceTemplateDbStore";
import type { InstanceTemplate } from "../../type/InstanceTemplate";
import { AddItemForm } from "./AddItemForm";
import { EditItemForm } from "./EditItemForm";
import { TemplateTable } from "./TemplateTable";

export const TemplateSection: React.FC = () => {
  const [items, setItems] = useState<InstanceTemplate[]>([]);
  const [selectedItem, setSelectedItem] = useState<InstanceTemplate | null>(
    null
  );
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemImage, setNewItemImage] = useState<string>("");

  React.useEffect(() => {
    Datas.list({ dbStore: InstanceTemplateDbStore }).then(async (keys) => {
      const items = (
        await Promise.all(
          keys.map((key) =>
            Datas.get<InstanceTemplate>({
              dbStore: InstanceTemplateDbStore,
              key,
            })
          )
        )
      ).filter(isDefined);
      setItems(items);
    });
  }, []);

  // React.useEffect(() => {
  //   Idbs.list(InstanceTemplateIdb).then(async (keys) => {
  //     const items = (
  //       await Promise.all(keys.map((key) => Idbs.get(InstanceTemplateIdb, key)))
  //     ).filter(isDefined);
  //     setItems(items);
  //   });
  // }, []);

  const handleSelectItem = (item: InstanceTemplate) => {
    setSelectedItem(item);
  };

  const handleRemoveItem = async (item: InstanceTemplate) => {
    setItems(items.filter((i) => i !== item));

    await Datas.remove({ dbStore: InstanceTemplateDbStore, query: item.name });

    // await Idbs.remove(InstanceTemplateIdb, item.name);
  };

  const handleAddItem = async () => {
    const newItem: InstanceTemplate = {
      name: newItemName,
      image: newItemImage,
      diskGb: 10,
      env: {},
      exposedPortMappings: {},
    };
    await Datas.put({
      dbStore: InstanceTemplateDbStore,
      key: newItemName,
      value: newItem,
    });
    // await Idbs.put(InstanceTemplateIdb, newItemName, newItem);
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemImage("");
  };

  const handleUpdateItem = async (updatedItem: InstanceTemplate) => {
    setItems(
      items.map((item) => (item.name === updatedItem.name ? updatedItem : item))
    );
    await Datas.put({
      dbStore: InstanceTemplateDbStore,
      key: updatedItem.name,
      value: updatedItem,
    });
    // await Idbs.put(InstanceTemplateIdb, updatedItem.name, updatedItem);
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
