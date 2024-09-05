import React, { useState, useEffect  } from 'react';
import {
AdvancedMarker,
InfoWindow,
useAdvancedMarkerRef,
Pin
} from '@vis.gl/react-google-maps';

interface MarkerWithInfowindowProps {
title: string;
position: {
    lat: number;
    lng: number;
};
}

interface Event {
    name: string;
    date: string;
    time: string;
  }

export const MarkerWithInfowindow: React.FC<MarkerWithInfowindowProps> = ({ title, position }) => {
const [infowindowOpen, setInfowindowOpen] = useState(false);
const [markerRef, marker] = useAdvancedMarkerRef();
const [events, setEvents] = useState<Event[]>([]);

const fetchEvents = async (position: { lat: number; lng: number }) => {
    try {
      //const response = await fetch(`https://suaapi.com/eventos?lat=${position.lat}&lng=${position.lng}`);
      const response = await fetch(`https://66d6f9b6006bfbe2e64f53b6.mockapi.io/api/test/eventsmap`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  useEffect(() => {
    if (infowindowOpen) {
      fetchEvents(position);
    }
  }, [infowindowOpen, position]);

return (
    <>
    <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={position} // Usando a prop `position`
        title={title} // Usando a prop `title`
    >
      <Pin
                background={'#6a27a1'}
                borderColor={'#12041e'}
                glyphColor={'#320656'}></Pin>
    </AdvancedMarker>
    
    {infowindowOpen && (
        <InfoWindow
        anchor={marker}
        maxWidth={200}
        onCloseClick={() => setInfowindowOpen(false)}
      >
        <div style={{ fontFamily: 'Roboto, sans-serif', color: 'black' }}>
          <h4>Eventos Próximos</h4>
          {events.length > 0 ? (
            <ul>
              {events.map(event => (
                <li key={event.name}>
                  <strong>{event.name}</strong><br />
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum evento encontrado nesta localização.</p>
          )}
        </div>
      </InfoWindow>
    )}
    </>
);
};
