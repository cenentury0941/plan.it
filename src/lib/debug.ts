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
    shortDescription: "A cozy neighborhood bistro known for its authentic cuisine and warm atmosphere",
    lat: 40.7589,
    lng: -73.9851
  },
  {
    id: 1,
    name: "Location of Import",
    type: "Historical Site",
    shortDescription: "A significant landmark that played a crucial role in the city's development",
    lat: 37.7749,
    lng: -122.4194
  },
  {
    id: 2,
    name: "Place 420",
    type: "Park",
    shortDescription: "A recreational area with walking trails, playgrounds, and picnic facilities",
    lat: 34.0522,
    lng: -118.2437
  },
  {
    id: 3,
    name: "Another Place",
    type: "Museum",
    shortDescription: "An educational institution featuring exhibits on local history and culture",
    lat: 41.8781,
    lng: -87.6298
  },
  {
    id: 4,
    name: "Some Other Other Place",
    type: "Shopping Center",
    shortDescription: "A modern retail complex with various stores, restaurants, and entertainment options. A modern retail complex with various stores, restaurants, and entertainment options",
    lat: 29.7604,
    lng: -95.3698
  },
  {
    id: 5,
    name: "Some Other Place",
    type: "Library",
    shortDescription: "A public facility offering books, digital resources, and community programs",
    lat: 39.2904,
    lng: -76.6122
  },
  {
    id: 6,
    name: "Other Place",
    type: "Coffee Shop",
    shortDescription: "A trendy café serving artisanal coffee, pastries, and light meals A trendy café serving artisanal coffee, pastries, and light meals A trendy café serving artisanal coffee, pastries, and light meals",
    lat: 47.6062,
    lng: -122.3321
  }
];