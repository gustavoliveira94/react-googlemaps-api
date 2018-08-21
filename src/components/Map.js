/* eslint-disable no-undef */
import React, { Component } from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
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
  withStateHandlers(() => ({
    isOpen: false,
    showInfo: 0
  }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
      showInfo: ({ showInfo, isOpen }) => (index) => ({
        isOpen: !isOpen,
        showInfoIndex: index
      }),
    }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={props.center}
  >
    {
      props.markers.map((marker, index) => {
        return <Marker icon={'https://image.ibb.co/kpxg5z/placeholder_2.png'} key={index}
          position={{ lat: marker.location.lat, lng: marker.location.lng }}
          onClick={() => { props.showInfo(index) }}>
          {
            (props.showInfoIndex === index) && <InfoWindow onCloseClick={props.onToggleOpen}>
              <ul>
                <li>Nome do Local: {marker.name}</li>
                <li>Endereço: {marker.location.formattedAddress[0]}, <br /> {marker.location.formattedAddress[1]}, <br /> {marker.location.formattedAddress[2]}</li>
              </ul>
            </InfoWindow>
          }
        </Marker>
      })
    }
  </GoogleMap>

);

export default Map