import { Platform } from "react-native";
const BASE_URL = Platform.OS === "android" ? 'http://10.0.2.2:3001' : 'http://localhost:3001';

export function api(path: string, options?: RequestInit) {
  return fetch(BASE_URL + path, options);
}
