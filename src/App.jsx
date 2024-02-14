import { useState, useRef, useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import mapboxgl from 'mapbox-gl';
import { DEFAULT_MARKERS } from './constants'
import 'mapbox-gl/dist/mapbox-gl.css'


mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;


function App() {
  const unfilteredGeoJSON = DEFAULT_MARKERS.features;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.8986);
  const [lat, setLat] = useState(35.9940);
  const [zoom, setZoom] = useState(9);
  const [filteredGeoJSON, setFilteredGeoJSON] = useState(unfilteredGeoJSON)
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
  
    // check if markers have already rendered - this gets around strict mdoe rendering each marker 2x
    // create a marker for each item in unfiltered geoJSON
    // setting a key-value pair for markerId: marker in order to grab marker by its id later 
  useEffect(() => {
    if(map.current && !markersRendered) {
      let markersWithId = {};
      for (const feature of unfilteredGeoJSON) {
        let newMarker = new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map.current)
        markersWithId[feature.id] = newMarker;
        markersRendered = true;
        setCurrentMarkers({...markersWithId});
      }}
  }, [])

  // when the geoJSON obj changes, remove or recreate markers as needed
  useEffect(() => {
      if (Object.keys(currentMarkers).length === 0) {
      } else {
        const updatingMarkers = {...currentMarkers}
        var currentMarkerKeys = Object.keys(currentMarkers)
        var filteredGeoJSONKeys = filteredGeoJSON.map((loc) => {return loc.id})
        // filter the list of current marker keys and remove associated value (marker) if not present in filtered geoJSON keys
        var keysToRemove = currentMarkerKeys.filter((x) => !filteredGeoJSONKeys.includes(x))
        var markerKeysToAdd = filteredGeoJSONKeys.filter((x) => !currentMarkerKeys.includes(x))
        for (const feature of filteredGeoJSON) {
          // if feature.id does not exist in currentmarkers, add one
          if (currentMarkerKeys.length !== 0 && !currentMarkerKeys.includes(feature.id)) {
            let newMarker = new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map.current)
            // add new markers to current markers state
            updatingMarkers[feature.id] = newMarker
            setCurrentMarkers(updatingMarkers)
          }
        }
        for (const key of keysToRemove) {
          // remove marker - doesn't update actual state
          currentMarkers[key].remove()
          delete updatingMarkers[key];
          setCurrentMarkers(updatingMarkers)
        }  
      }
  }, [filteredGeoJSON])

  useEffect(() => {
    if (map.current) {
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });  
    }  
  }, [])

  // use the entered search term to filter the DEFAULT_MARKERS list
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    let filteredGeoJSON = unfilteredGeoJSON.filter((marker) => {return marker.properties.name && marker.properties.name.includes(searchTerm)})
    // set geoJSON to the filtered markers
    setFilteredGeoJSON(filteredGeoJSON)
  }
    
  return (
    <div className="App">
      <Nav onchange={handleSearch} searchTerm={searchTerm} markers={filteredGeoJSON} />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;