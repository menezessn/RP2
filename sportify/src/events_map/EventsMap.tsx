import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

type Poi ={ key: string, location: google.maps.LatLngLiteral }
const locations: Poi[] = [
    {key: 'Ginásio', location: { lat: -23.484426920540812, lng: -46.49994158067324  }},
    {key: 'Quadra externa', location: { lat: -23.48344290192569, lng: -46.50015615738601 }},
];

// Substitua 'YOUR_GOOGLE_MAPS_API_KEY' pelo seu token do Google Maps
const GOOGLE_MAPS_API_KEY = 'AIzaSyC-4s9aa2vYjfQ7VcsAmCGxFf6ITxzsklk';

const mapContainerStyle = {
width: '100%',
height: '100vh',
};

const center = {
lat: -23.482734403964987, // Latitude inicial
lng: -46.500783794291706 // Longitude inicial
};

// Exemplo de coordenadas de eventos
const eventLocations = [
{ lat: -23.484426920540812, lng: -46.49994158067324, name: 'Evento 1', type: 'Tipo A' },
{ lat: -23.48344290192569, lng: -46.50015615738601, name: 'Evento 2', type: 'Tipo B' }
];

const EventsMap: React.FC = () => {
const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
});

const [selectedLocation, setSelectedLocation] = useState<any>(null);

const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
    // Aqui você pode fazer a requisição à API para obter a lista de eventos
    // e atualizar o estado com os dados recebidos
};

if (!isLoaded) return <div>Loading...</div>;

return (

    <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={17}
    >
        {eventLocations.map((location, index) => (
        <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleMarkerClick(location)}
        />
        ))}
    </GoogleMap>

);
};


export default EventsMap;


