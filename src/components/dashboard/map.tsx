'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Map(){
    return <MapContainer 
                center={[0,0]} 
                zoom={5} 
                scrollWheelZoom={true}
                zoomControl={false}
                style={{ height: "100%", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[0,0]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            </MapContainer>
}