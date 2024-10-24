import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';
const containerStyle = {
    width: '80%',
    height: '100vh',
    borderRadius:8
  };
  

function GoogleMapSection({coordinates,listing}) {
   
    const [center,setCenter]=useState({
        lat: -1.286389,
        lng: 36.817223
      })
      const [map, setMap] = useState(null)
    //   const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY
    //   })
      useEffect(()=>{
        coordinates&&setCenter(coordinates)
      },[coordinates])
     
      useEffect(() => {
        if (map) {
          
            map.setZoom(10);
        }
    }, [map]);
      const onLoad = useCallback(function callback(map) {
      
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
       
      }, [])
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
  return (
    <div>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={map=>setMap(map)}
        
        onUnmount={onUnmount}
        gestureHandling="greedy"
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {listing.map((item,index)=>(
            <MarkerItem
                key={index}
                item={item}
            />
        ))}
      </GoogleMap>
    </div>
  )
}

export default GoogleMapSection