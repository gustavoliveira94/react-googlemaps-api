/* eslint-disable no-undef */
import React, { Component } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { compose, withProps, withStateHandlers } from 'recompose'
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps'
import './App.css'

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

class App extends Component {

  constructor() {
    super()
    this.state =
      {
        markers: [],
        searchMarkers: '',
        debounce: []
      }
      this.handleChange = this.handleChange.bind(this)
    this.filterList = this.filterList.bind(this)
  }

  componentWillMount() {
    this.setState({
      markers: this.state.markers
    })
  }

  handleChange(event) {
    this.setState({ debounce : event.target.value });
}

  componentDidMount() {
    const url = [
      // Length issue
      `https://api.foursquare.com/v2/venues/search?`,
      `client_id=RUL3K0COWWO3LFT2ONJABQ2P4SXFKXISTMWXKENFWC04Y1SA`,
      `&client_secret=VKCHEYUH1M4AN1JAC315U45POZGMHUXCWFWGPLJFCRDJKC4G`,
      `&v=20180323`,
      `&limit=30`,
      `&ll=-22.8813215,-43.4647076`,
      `&radius=200`
    ].join("")

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.response.venues });
      });
  }


  filterList(event) {
    let markers = this.state.markers
    markers = markers.filter(item => {
        return item.name === event.target.value
    })
    this.setState({ markers: markers });
  }


  render() {
    return (
      <header className="main">
        <div className="locations">
          <h1>U-LOCATIONS</h1>
          <DebounceInput
            className="filter"
            minLength={2}
            debounceTimeout={300}
            placeholder="DIGITE UM LOCAL"
            value={this.state.debounce}
            onChange={this.filterList} />
          <ul>
            {
              this.state.markers.map((marker, index) => {
                return <li key={index}>{marker.name}</li>
              })
            }
          </ul>
        </div>
        <div className="map">
          <Map markers={this.state.markers}/>
        </div>
      </header >
    );
  }
}

export default App;