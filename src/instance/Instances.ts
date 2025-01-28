import { getConnection } from "../connection/Connections";

export const rentInstance = async ({
  machineId,
  diskGb = 10,
  image,
  env,
  exposedPortMappings,
}: {
  machineId: number;
  diskGb?: number;
  image: string;
  env?: Record<string, string>;
  exposedPortMappings?: Record<number, number>;
}) => {
  const con = await getConnection();
  const resp = con.request({
    subject: "vastai.create.instance",
    request: {
      body: {
        machineId,
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

export const Instances = { rentInstance };
