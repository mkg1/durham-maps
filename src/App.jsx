import { useState, useRef, useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
// import Map from './components/Map'
import mapboxgl from 'mapbox-gl';
import { DEFAULT_MARKERS } from './constants'


mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;


function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.8986);
  const [lat, setLat] = useState(35.9940);
  const [zoom, setZoom] = useState(9);


  useEffect(() => {
    // initialize map only once
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    }); 
  }, []);
  
  useEffect(() => {
    console.log("wheeeee")
    if(map.current) {
      for (const feature of DEFAULT_MARKERS.features) {
      // make a marker for each feature and add to the map
      const el = document.getElementsByClassName('marker');
      el.className = 'marker'
      new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map.current)
      }}
  }, [])



  if (map.current) {
    console.log("but do we make it here?")
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