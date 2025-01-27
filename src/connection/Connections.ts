import { Idbs } from "@mjt-engine/idb";
import { Messages } from "@mjt-engine/message";
import { AppConfig } from "../AppConfig";
import { GLOBALS } from "../GLOBALS";
import { useConnection } from "./useConnection";
import type { VastaiConnectionMap } from "@mjt-services/vastai-common-2025";
import type { TunnelConnectionMap } from "@mjt-services/tunnel-common-2025";

export let _connection:
  | Awaited<ReturnType<typeof createConnection>>
  | undefined = undefined;

export const createConnection = async () => {
  const config = await Idbs.get(AppConfig, "config");
  const con = await Messages.createConnection<
    VastaiConnectionMap & TunnelConnectionMap
  >({
    server: GLOBALS.mqUrl,
    options: { log: console.log },
    token: config?.authToken,
  });

  return con;
};

export const getConnection = async () => {
  if (!_connection) {
    _connection = await createConnection();
  }
  return _connection;
};
export const Connections = {
  getConnection,
  useConnection,
};
