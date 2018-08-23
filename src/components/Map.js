/* eslint-disable no-undef */
import React from 'react'
import styleMap from '../utils/styleMap.json'
import { compose, withProps } from 'recompose'
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps'

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
  // CALL GOOGLE MAPS API
  <GoogleMap
    defaultZoom={17}
    defaultCenter={props.center}
    defaultOptions={{ styles: styleMap }}

  >

  {/* FILTER THE MARKERS */}
    {
      props.markers.map((marker, index) => {
        return <Marker
          animation={google.maps.Animation.DROP}
          iconDefault={props.iconDefault}
          iconSelected={props.iconSelected}
          icon={props.indexInfo === index && props.isOpen === true ? { url: props.iconSelected } : { url: props.iconDefault }}
          key={index}
          isOpen={props.isOpen}
          indexInfo={props.indexInfo}
          position={{ lat: marker.location.lat, lng: marker.location.lng }}
          onClick={() => props.onToggleOpen(index, true)} >
          {
            (props.indexInfo === index && props.isOpen) && <InfoWindow onCloseClick={() => props.onToggleOpen(index, false)}>
              <ul className="info">
                <li><span>Nome do Local:</span> {marker.name}</li>
                <li><span>Endereço:</span> {marker.location.formattedAddress[0]}, <br /> {marker.location.formattedAddress[1]}, <br /> {marker.location.formattedAddress[2]}</li>
                <li><span>API:</span> FourSquare</li>
              </ul>
            </InfoWindow>
          }
        </Marker>
      })
    }
  </GoogleMap>

);

export default Map