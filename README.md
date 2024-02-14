# Durham Trails Map

## Overview
A simple, searchable map of local Durham trails using the [Mapbox GL JS API](https://docs.mapbox.com/mapbox-gl-js/api/) and built with React. This project was created as a solo project precursor for [Chingu Voyages](https://www.chingu.io/).

### Features
- Displays a collection of pre-selected trail markers in and around Durham.
- Toggle search bar and trail list using the menu icon.
- Search by trail name to narrow down displayed markers. 
- Configurable trail markers using geoJSON.

### Running this project locally
- Clone this repo locally
- Install necessary packages, `npm install`
- Create a `.env` file and set `VITE_MAP_BOX_KEY` equal to your Mapbox key (see below for obtaining a key).
- Run `npm run dev` to start the app in development mode

### Mapbox & Configurations
- To obtain a Mapbox key, you will need to create a [Mapbox account](https://www.mapbox.com/). Note: this may ask you for a credit card. It won't charge you up front, but be aware that you are allotted 50,000 free map loads and anything beyond that will incur charges. While it's highly unlikely you'll hit that, it's worth noting. 
- Once you've created an account, navigate to your account and create a new token named whatever you like.
- Copy that token into the .env file you created (above).
- If you want to the map to display a different set of markers, you can create your own geoJSON file and replace `DEFAULT_MARKERS` in `src/constants.js` with the updated data. Mapbox Studio provides a way of create custom geoJSON. Note: for this app, all geoJSON features should include a name. 

