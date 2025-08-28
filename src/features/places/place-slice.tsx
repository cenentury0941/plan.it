import { Place } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import { RefObject } from "react";

export const placeSlice = createSlice({
    name: "place",
    initialState: {
        places: [] as Place[],
        flyTo: null as Place,
        markerRefs: null as Map<string, RefObject<any>>
    },
    reducers: {
        setPlaces: (state, action) => {
            const updatedPlaces = action.payload as Place[]
            console.log("Places : " , updatedPlaces)
            state.places = updatedPlaces
          },
        flyTo: (state, action) => {
            state.flyTo = action.payload as Place
        },
        updateMarkerRefs: (state, action) => {
            state.markerRefs = action.payload as Map<string, RefObject<any>>
        }
    }
});

export const { setPlaces, flyTo, updateMarkerRefs } = placeSlice.actions

export default placeSlice.reducer