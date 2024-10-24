import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: 10,
};

function GoogleMapSection({ coordinates, listing }) {
  const [center, setCenter] = useState({
    lat: -1.286389,
    lng: 36.817223,
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY, // Replace with your API key
  });

  const onLoad = useCallback((map) => {
    if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: center,
      });
    } else {
      new google.maps.Marker({
        map,
        position: center,
      });
    }
  }, [center]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
    >
      {/* Your markers and other components */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMapSection;