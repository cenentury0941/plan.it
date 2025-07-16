import { Place } from "./types";

export function generateRandomSource(): string{
    const index = Math.floor((Math.random()*2.9))
    return ["User","Other","Bot"][index]
}

export const debug_places: Place[] = [
    {
      id: 0,
      name: "Place 1",
      type: "Restaurant",
      description: "A cozy neighborhood bistro known for its authentic cuisine and warm atmosphere"
    },
    {
      id: 1,
      name: "Location of Import",
      type: "Historical Site",
      description: "A significant landmark that played a crucial role in the city's development"
    },
    {
      id: 2,
      name: "Place 420",
      type: "Park",
      description: "A recreational area with walking trails, playgrounds, and picnic facilities"
    },
    {
      id: 3,
      name: "Another Place",
      type: "Museum",
      description: "An educational institution featuring exhibits on local history and culture"
    },
    {
      id: 4,
      name: "Some Other Other Place",
      type: "Shopping Center",
      description: "A modern retail complex with various stores, restaurants, and entertainment options. A modern retail complex with various stores, restaurants, and entertainment options"
    },
    {
      id: 5,
      name: "Some Other Place",
      type: "Library",
      description: "A public facility offering books, digital resources, and community programs"
    },
    {
      id: 6,
      name: "Other Place",
      type: "Coffee Shop",
      description: "A trendy café serving artisanal coffee, pastries, and light meals A trendy café serving artisanal coffee, pastries, and light meals A trendy café serving artisanal coffee, pastries, and light meals"
    }
  ];