import type { VastAiInstance } from "@mjt-services/vastai-common-2025";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { getConnection } from "../../connection/Connections";
import { Instances } from "../../instance/Instances";

export const InstanceSection = () => {
  const [instances, setInstances] = useState<VastAiInstance[]>([]);

  const updateList = async () => {
    const con = await getConnection();
    const instances = await con.request({
      subject: "vastai.show.instances",
      request: {
        body: {},
      },
    });
    setInstances(instances);
  };

  useEffect(() => {
    updateList();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Instances
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={updateList}
        style={{ marginBottom: "16px" }}
      >
        Refresh Instances
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>CPU</TableCell>
              <TableCell>GPU</TableCell>
              <TableCell>RAM</TableCell>
              <TableCell>Disk</TableCell>
              <TableCell>Network</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instances.map((instance) => (
              <TableRow key={instance.id}>
                <TableCell>{instance.id}</TableCell>
                <TableCell>{instance.label}</TableCell>
                <TableCell>{instance.actual_status}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Name: {instance.cpu_name}
                  </Typography>
                  <Typography variant="body2">
                    Cores: {instance.cpu_cores}
                  </Typography>
                  <Typography variant="body2">
                    Util: {instance.cpu_util}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Name: {instance.gpu_name}
                  </Typography>
                  <Typography variant="body2">
                    RAM: {instance.gpu_ram} MB
                  </Typography>
                  <Typography variant="body2">
                    Util: {instance.gpu_util}%
                  </Typography>
                </TableCell>
                <TableCell>{instance.cpu_ram} MB</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Name: {instance.disk_name}
                  </Typography>
                  <Typography variant="body2">
                    Space: {instance.disk_space} GB
                  </Typography>
                  <Typography variant="body2">
                    Usage: {instance.disk_usage} GB
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Down: {instance.inet_down} MB
                  </Typography>
                  <Typography variant="body2">
                    Up: {instance.inet_up} MB
                  </Typography>
                </TableCell>
                <TableCell>
                  {new Date(instance.start_date).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Stack gap={"1em"}>
                    <Button
                      onClick={() => {
                        Instances.stopInstance(instance.id);
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Stop
                    </Button>
                    <Button
                      onClick={() => {
                        Instances.createTunnel({ instance });
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Create Tunnel
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
