import type {
  VastaiConnectionMap,
  VastAiInstance,
} from "@mjt-services/vastai-common-2025";
import { getConnection } from "../connection/Connections";
import { Idbs } from "@mjt-engine/idb";
import { Asserts } from "@mjt-engine/assert";
import { Datas } from "../data/Datas";
import { InstanceTemplateDbStore } from "../state/InstanceTemplateDbStore";
import type { InstanceTemplate } from "../type/InstanceTemplate";

export const rentInstance = async (
  body: VastaiConnectionMap["vastai.create.instance"]["request"]["body"]
) => {
  console.log("body", body);
  const con = await getConnection();
  const resp = await con.request({
    subject: "vastai.create.instance",
    request: {
      body,
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
  instance,
}: {
  instance: VastAiInstance;
}) => {
  console.log("instance", instance);
  const con = await getConnection();
  const { id, label } = instance;
  const serviceName = Asserts.assertValue(label);
  // const instanceTemplate = await Idbs.get(InstanceTemplateIdb, serviceName);
  const instanceTemplate = await Datas.get<InstanceTemplate>({
    dbStore: InstanceTemplateDbStore,
    key: serviceName,
  });
  const targetPort = Asserts.assertValue(instanceTemplate?.targetPort);
  console.log("instanceTemplate", instanceTemplate);
  console.log("targetPort", targetPort);
  console.log("serviceName", serviceName);
  const resp = await con.request({
    subject: "vastai.connect.instance",
    request: {
      body: {
        contractId: id,
        serviceName,
        targetPort,
      },
    },
  });
  console.log(resp);
  return resp;
};

export const Instances = { rentInstance, stopInstance, createTunnel };
