import { API_KEY } from "../constants/api";

export const HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

export const toCamelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const transformKeys = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [toCamelCase(key), value])
  );
};

export const parseResponse = async (res: Response) => {
  const { data } = await res.json();
  return data.map(transformKeys);
}