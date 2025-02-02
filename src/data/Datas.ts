import type { DataConnectionMap } from "@mjt-services/data-common-2025";
import { getConnection } from "../connection/Connections";

export const add = async (
  body: DataConnectionMap["data.add"]["request"]["body"]
) => {
  const con = await getConnection();
  return con.request({ subject: "data.add", request: { body } });
};

export const get = async <T = unknown>(
  body: DataConnectionMap["data.get"]["request"]["body"]
) => {
  const con = await getConnection();
  return con.request({ subject: "data.get", request: { body } }) as Promise<T>;
};

export const put = async (
  body: DataConnectionMap["data.put"]["request"]["body"]
) => {
  const con = await getConnection();
  return con.request({ subject: "data.put", request: { body } });
};

export const list = async (
  body: DataConnectionMap["data.list"]["request"]["body"]
) => {
  const con = await getConnection();
  return con.request({ subject: "data.list", request: { body } });
};

export const remove = async (
  body: DataConnectionMap["data.remove"]["request"]["body"]
) => {
  const con = await getConnection();
  return con.request({ subject: "data.remove", request: { body } });
};

export const Datas = { put, add, get, list, remove };
