import { CHAT_UUID, DEVICE_UUID, ID_URL_PARAM } from "@/constants/strings";

export function getOrCreateDeviceUUID(): string {
    const stored = localStorage.getItem(DEVICE_UUID);
    if (stored) return stored;
    
    const newUUID = crypto.randomUUID();
    localStorage.setItem(DEVICE_UUID, newUUID);
    return newUUID;
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