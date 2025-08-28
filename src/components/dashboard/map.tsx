'use client'
import { flyTo } from '@/features/places/place-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Place } from '@/lib/types'
import L, { Point } from 'leaflet'
import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'

function FlyTo({places} : {places: Place[]}){
    const flyToPlace = useAppSelector( (state) => state.places.flyTo ) as Place
    const flyToPlaceRef = useRef<Place>(null)
    const map = useMap();
    const dispatch = useAppDispatch();

    useEffect(() => {
        places.map((place) => L.marker([place.lat, place.lng])
        .addEventListener( "click" , () => {
            if(flyToPlaceRef.current == null || flyToPlaceRef.current.id != place.id)
            {
                dispatch(flyTo(place))
            }
        } )
        .addTo(map));

        map.addEventListener('popupclose', (popup) => {
            console.log("Closing Pop Up")
            if(flyToPlaceRef.current){
                console.log( "popup : " ,  popup.popup.getLatLng() )
                console.log( "flyTo : " , {lat: flyToPlaceRef.current.lat, lng: flyToPlaceRef.current.lng} )
            }
            else {
                console.log("FlyToPlace Null")
            }
            if(flyToPlaceRef.current && popup.popup.getLatLng().equals({lat: flyToPlaceRef.current.lat, lng: flyToPlaceRef.current.lng}))
            {
                console.log("setting fly to null")
                dispatch(flyTo(null))
            }
        })
    }, [])

    useEffect(()=>{
        flyToPlaceRef.current = flyToPlace;

        if(!flyToPlace)
        {
            return
        }
        //console.log("Flying to : " , flyToPlace.name)

        map.flyTo([flyToPlace.lat,flyToPlace.lng], 12);

        L.popup({offset: new Point(0, -39)})
        .setLatLng([flyToPlace.lat,flyToPlace.lng])
        .setContent(`${flyToPlace.name} <br /> ${flyToPlace.shortDescription}`)
        .openOn(map)
        .openPopup();

    },[flyToPlace])
    return null;
}

export default function LeafletMap(){

    const places = useAppSelector((state)=>{return state.places.places}) as Place[]
    const dispatch = useAppDispatch();

    return <MapContainer 
                center={[0,0]} 
                zoom={5} 
                scrollWheelZoom={true}
                zoomControl={false}
                style={{ height: "120%", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FlyTo places={places}/>
            {places.map((place)=>{
                return <Marker key={place.id} position={[place.lat,place.lng]}/>
            })}
            </MapContainer>
}