/* eslint-disable no-undef */
import React from 'react'
import MyMarker from './components/MyMarker'
import { compose, withProps } from 'recompose'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDz9XmXOh4nbDkeyOFFQHk_7SL7Uhc0aKI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: {
      lat: -22.8813215,
      lng: -43.4647076
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={18}
    defaultCenter={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    {
      props.markers.map((marker, index) => {
        return <MyMarker key={index} 
        position={{ lat: marker.location.lat, lng: marker.location.lng }}
        />
          {/* {
            props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
              <div>
                <ul>
                  <li>Nome do Local: {marker.name}</li>
                  <li>Endereço: {marker.location.formattedAddress[0]}, <br /> {marker.location.formattedAddress[1]}, <br /> {marker.location.formattedAddress[2]}</li>
                </ul>
              </div>
            </InfoWindow>
          } */}
        {/* </MyMarker> */}
      })
    }
  </GoogleMap>

);

export default Map