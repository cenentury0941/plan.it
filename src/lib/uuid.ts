import { CHAT_UUID, DEVICE_UUID, ID_URL_PARAM, USER_NAME } from "@/constants/strings";

export function getOrCreateDeviceUUID(): string {
    const stored = localStorage.getItem(DEVICE_UUID);
    if (stored) return stored;
    
    const newUUID = crypto.randomUUID();
    localStorage.setItem(DEVICE_UUID, newUUID);
    return newUUID;
  }

export function getOrCreateUsername(username: string = "Username"): string {
  const stored = localStorage.getItem(USER_NAME);
  if (stored) return stored;
  
  localStorage.setItem(USER_NAME, username);
  return username;
}

export function hasUsername(): boolean {
  const stored = localStorage.getItem(USER_NAME);
  return stored != null;
}

export function getUsername(): string {
  const stored = localStorage.getItem(USER_NAME);
  return stored;
}

export function setUsername(username: string): string {
  localStorage.setItem(USER_NAME, username);
  return username;
}

export function getOrCreateChatUUID(): string {
  const urlParams = new URLSearchParams(window.location.search);
  const idFromUrl = urlParams.get(ID_URL_PARAM);

  if(idFromUrl){
    localStorage.setItem(CHAT_UUID, idFromUrl);
    return idFromUrl;
  }

  const stored = localStorage.getItem(CHAT_UUID);
  if (stored) return stored;
  
  const newUUID = crypto.randomUUID();
  localStorage.setItem(CHAT_UUID, newUUID);
  return newUUID;
}

export function hasChatUUID(): boolean {
  const stored = localStorage.getItem(CHAT_UUID);
  return stored != null;
}

export function urlHasChatUUID(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  const idFromUrl = urlParams.get(ID_URL_PARAM);
  return idFromUrl != null;
}