import {
APIProvider,
Map,
} from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from './MarkerWithInfoWindow';

const GOOGLE_MAPS_API_KEY = ("AIzaSyC-4s9aa2vYjfQ7VcsAmCGxFf6ITxzsklk");

const center = {
    lat: -23.482734403964987, 
    lng: -46.500783794291706 
    };

const EventsMap: React.FC = () =>  {

return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
    <div style={{ height: "100vh", width: "100%" }}>
        <Map 
        defaultZoom={17}
        defaultCenter={center}
        gestureHandling={'greedy'}
        disableDefaultUI
        mapId={'3f1fde80fcc6d96c'}
        >

            <MarkerWithInfowindow position={{lat: -23.484426920540812, lng: -46.49994158067324}} title='Teste' />
        
        </Map>
    </div>
    </APIProvider>
);
}

export default EventsMap;