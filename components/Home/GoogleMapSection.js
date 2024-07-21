import { DestinationContext } from '@/context/DestinationContext';
import { SourceContext } from '@/context/SourceContext';
import { DirectionsRenderer, GoogleMap, Marker, MarkerF, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { Sora } from 'next/font/google';
import React, { useEffect } from 'react'

function GoogleMapSection() {
  const {source, setSource} = React.useContext(SourceContext);
  const {destination, setDestination} = React.useContext(DestinationContext);
  const [center,setCenter] = React.useState({
    lat: 11.1003,lng: 76.94
  });
  const [directions, setDirections] = React.useState(null);

  const containerStyle = {
    width: '100%',
    height: window.innerWidth*0.4
  };

  useEffect(() => {
    if(source?.length!=[]&&map){
      map.panTo({lat:source.lat,lng:source.lng})
      setCenter({lat:source.lat,lng:source.lng})
    }
    if(source?.length!=[]&&destination?.length!=[]){
      DirectionRoute();
    }
  },[source]);
  
  useEffect(() => {
    if(destination?.length!=[]&&map){
      map.panTo({lat:destination.lat,lng:destination.lng})
      setCenter({lat:destination.lat,lng:destination.lng})
    }
    if(source?.length!=[]&&destination?.length!=[]){
      DirectionRoute();
    }
  },[destination]);

  const DirectionRoute = () => {
    const service = new google.maps.DirectionsService();
    service.route({
      origin:{lat:source.lat,lng:source.lng},
      destination:{lat:destination.lat,lng:destination.lng},
      travelMode: google.maps.TravelMode.DRIVING
    },(result,status) => {
      if(status === google.maps.DirectionsStatus.OK){
        setDirections(result)
      }else{
        console.error(`error fetching directions ${result}`);
      }
    })
  }

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >

      {source.length!=[]?<MarkerF position={{lat:source.lat,lng:source.lng}}>
        <OverlayViewF position={{lat:source.lat,lng:source.lng}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className='p-2 bg-white font-bold inline-block'>
            <p className='text-black text-[18px]'>{source.label}</p>
          </div>
        </OverlayViewF>
      </MarkerF>:null}
      {destination.length!=[]?<MarkerF position={{lat:destination.lat,lng:destination.lng}}>
      <OverlayViewF position={{lat:destination.lat,lng:destination.lng}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className='p-2 bg-white font-bold inline-block'>
            <p className='text-black text-[18px]'>{destination.label}</p>
          </div>
        </OverlayViewF>
      </MarkerF>:null}
      <DirectionsRenderer directions={directions} options={{
        suppressMarkers:true,
        polylineOptions:{
          strokeColor: '#000',
          strokeWeight: 5
        }}}/>
      </GoogleMap>

  )
}

export default GoogleMapSection