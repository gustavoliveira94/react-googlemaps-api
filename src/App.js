/* eslint-disable no-undef */
import React, { Component } from 'react'
import { DebounceInput } from 'react-debounce-input'
import Map from './components/Map'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state =
      {
        markers: []
      }
    this.filterList = this.filterList.bind(this)
    this.viewMarkers = this.viewMarkers.bind(this)
  }

  componentDidMount() {
    const url = [
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
    this.setState({
      markers: this.state.markers.filter(marker => {
        return marker.name.toLowerCase().includes(event.target.value.toLowerCase())
      })
    })
    if (event.target.value <= 0) {
      const url = [
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
  }

  viewMarkers() {
    const list = document.querySelector('.locations ul');
    if (list.classList.contains('hidden')) {
      window.addEventListener("click", () => {
        list.classList.remove('hidden')
      })
    } else {
      window.addEventListener("click", () => {
        list.classList.add('hidden')
    }
  )}
}

  render() {
    return (
      <header className="main">
        <div className="locations">
          <div className="logo"><h1>U-LOCATIONS</h1> <i onClick={this.viewMarkers} className="fas fa-2x fa-bars"></i></div>
          <DebounceInput
            className="filter"
            minLength={1}
            debounceTimeout={0}
            placeholder="DIGITE UM LOCAL"
            onChange={this.filterList} />
          <ul className="hidden">
            {
              this.state.markers.map((marker, index) => {
                return <li key={index}>{marker.name}</li>
              })
            }
          </ul>
        </div>
        <div className="map">
          <Map markers={this.state.markers} />
        </div>
      </header >
    );
  }
}

export default App;