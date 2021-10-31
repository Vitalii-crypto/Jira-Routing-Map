import React, {useContext,  useRef, useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';
import { AppContext } from '../../App';
import Info from '../Info/Info';
import './Map.css';
import {Autocomplete} from "@react-google-maps/api";
require('dotenv').config();
const google = window.google;


export const Map = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `620px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
      mapId: 'c8d3fb7368eb6e72',
    }),
    withScriptjs,
    withGoogleMap,

)(() => {
  const { tags } = useContext(AppContext);

  const [modeTraveling, setModeTraveling] = useState('DRIVING');
  const [inputOrigin, setInputOrigin] = useState(null);
  const [inputDestination, setInputDestination] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [directions, setDirections] = useState(null);

  const DirectionsService = new google.maps.DirectionsService();

  const onOriginInputChange = (e) => {
    setInputOrigin(e.target.value);
  };

  const onDestinationInputChange = (e) => {
    setInputDestination(e.target.value);
  };

  const onSearchButtonClick = async (e) => {
    const geocoder = new google.maps.Geocoder();

    const getCoords = async (address, isObj = false) => {
      let coord;
      await geocoder.geocode({ address }, async (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          alert('Something got wrong ' + status);
          return;
        }
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();

        coord = new google.maps.LatLng(lat, lng);
      });

      if (!isObj) return coord;

      return {
        location: coord,
        stopover: false,
      };
    };

    let waypointsArr = [];

    if (tags) {
      await Promise.all(
          tags.map(async (t) => {
            const coords = await getCoords(t, true);
            setWaypoints([...waypoints, coords]);
            waypointsArr.push(coords);
          })
      );
    }


    const finalOrigin = await getCoords(inputOrigin);
    const finalDestination = await getCoords(inputDestination);

    await DirectionsService.route(
        {
          origin: finalOrigin,
          destination: finalDestination,
          waypoints: [...waypoints , ...waypointsArr],
          travelMode: modeTraveling,
        },
        (result, status) => {
          if (status !== google.maps.DirectionsStatus.OK)
          {
            alert('can`t build directions, chose another points');
            return
          }


          setDirections(result);
        }
    );
  };

  const originRef = useRef();
  const destinationRef = useRef();
  return (
      <>

        <div className='input-container'>
          <label>
            <Autocomplete onPlaceChanged={(e)=>{onOriginInputChange({target:originRef.current})}}>
              <input ref={originRef} placeholder="Point A" className='origin' onChange={onOriginInputChange}/>
            </Autocomplete>
          </label>
          <label>
            <Autocomplete  onPlaceChanged={(e)=>{onDestinationInputChange({target:destinationRef.current})}}>
              <input ref={destinationRef} placeholder="Point B" className='destination' onChange={onDestinationInputChange} />
            </Autocomplete>
          </label>
        </div>
        <div className='select-mode-container'>
          <button
              disabled={!inputOrigin || !inputDestination}
              className='buttonSearchcustom'
              onClick={onSearchButtonClick}
          >
            <span style={{color: 'white'}}>Click!</span>
            <span style={{color: 'white'}}>Build Direction</span>
          </button>
          <Dropdown>
            <Dropdown.Toggle>mode: {modeTraveling}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                  onClick={() => {
                    setModeTraveling('DRIVING');
                  }}
                  href='#/action-1'
              >
                Driving
              </Dropdown.Item>
              <Dropdown.Item
                  onClick={() => {
                    setModeTraveling('BICYCLING');
                  }}
                  href='#/action-2'
              >
                Bicycling
              </Dropdown.Item>
              <Dropdown.Item
                  onClick={() => {
                    setModeTraveling('TRANSIT');
                  }}
                  href='#/action-3'
              >
                Transit
              </Dropdown.Item>
              <Dropdown.Item
                  onClick={() => {
                    setModeTraveling('WALKING');
                  }}
                  href='#/action-4'
              >
                Walking{' '}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <GoogleMap
            defaultZoom={6}
            defaultCenter={new google.maps.LatLng(49.0, 29.5)}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>

        {directions && <Info directions={directions} />}

      </>
  );
});
