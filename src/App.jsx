import { useState, useRef, useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
// import Map from './components/Map'
import mapboxgl from 'mapbox-gl';
import { DEFAULT_MARKERS } from './constants'
import 'mapbox-gl/dist/mapbox-gl.css'


mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;


function App() {
  const unfilteredMarkers = DEFAULT_MARKERS.features;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.8986);
  const [lat, setLat] = useState(35.9940);
  const [zoom, setZoom] = useState(9);
  const [geoJSON, setGeoJSON] = useState(unfilteredMarkers)
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMarkers, setCurrentMarkers] = useState({})
  let markersRendered = false;

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
    if(map.current && !markersRendered) {
      let currentMarkerObj = {};
      for (const feature of unfilteredMarkers) {
        let featureId = feature.id;
        let newMarker = new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map.current)
        currentMarkerObj[featureId] = newMarker;
        setCurrentMarkers({...currentMarkerObj});
        markersRendered = true;
      }}
  }, [])

  useEffect(() => {
      var currentMarkerKeys = Object.keys(currentMarkers)
      var geoJSONKeys = geoJSON.map((loc) => {return loc.id})
      var plop = currentMarkerKeys.filter((x) => !geoJSONKeys.includes(x))
      for (const cle of plop) {
        currentMarkers[cle].remove()
      }
  }, [geoJSON])

  useEffect(() => {
    if (map.current) {
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });  
    }  
  }, [])

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    let filteredMarkers = DEFAULT_MARKERS.features.filter((marker) => {return marker.properties.name && marker.properties.name.includes(e.target.value)})
    setGeoJSON(filteredMarkers)
  }
    
  return (
    <div className="App">
      <Nav onchange={handleSearch} searchTerm={searchTerm} markers={geoJSON} />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;