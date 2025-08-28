export type ChatLog = {source: string, message: string, username: string, ts: number}

export type Place = {id: number, name: string, type: string, shortDescription: string, lat: number, lng: number}

export type ContentResponse = {
  response: string;
  updatedItinerary: {
    name: string;
    latitude: string;
    longitude: string;
    shortDescription: string;
    type: string;
  }[];
};
