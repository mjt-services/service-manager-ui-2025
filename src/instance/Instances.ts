import { getConnection } from "../connection/Connections";

export const rentInstance = async ({
  contractId,
  diskGb = 10,
  image,
  env,
  exposedPortMappings,
}: {
  contractId: number;
  diskGb?: number;
  image: string;
  env?: Record<string, string>;
  exposedPortMappings?: Record<number, number>;
}) => {
  const con = await getConnection();
  const resp = await con.request({
    subject: "vastai.create.instance",
    request: {
      body: {
        // TODO fix machineId->contractId
        machineId: contractId,
        diskGb,
        image,
        env,
        exposedPortMappings,
      },
    },
  });
  console.log(resp);
  return resp;
};

export const stopInstance = async (contractId: number) => {
  const con = await getConnection();
  const resp = await con.request({
    subject: "vastai.destroy.instance",
    request: {
      body: {
        contractId,
      },
    },
  });
  console.log(resp);
  return resp;
};

export const createTunnel = async ({
  contractId,
  serviceName,
  targetPort,
}: {
  contractId: number;
  serviceName: string;
  targetPort: number;
}) => {
  const con = await getConnection();
  const resp = await con.request({
    subject: "vastai.connect.instance",
    request: {
      body: {
        contractId,
        serviceName,
        targetPort,
      },
    },
  });
  console.log(resp);
  return resp;
};

export const Instances = { rentInstance, stopInstance, createTunnel };
