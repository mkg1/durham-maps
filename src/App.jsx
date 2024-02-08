import { useState, useRef, useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import Map from './components/Map'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;


function App() {
  console.log(import.meta.env.MAP_BOX_KEY, "keyyyy")
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.8986);
  const [lat, setLat] = useState(35.9940);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  if (map.current) {
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      });  
  }
    
    
  return (
    <div className="App">
      <Nav />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>

      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;