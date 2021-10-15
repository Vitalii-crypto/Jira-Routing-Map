import React from 'react';
import './Map.css'
import Info from "../Info/Info";
import {Dropdown} from "react-bootstrap";
const google = window.google;
const { compose, withProps, lifecycle } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require("react-google-maps");
require('dotenv').config()
let modeTraveling = 'DRIVING';



export const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({


        componentDidMount() {

            const DirectionsService = new google.maps.DirectionsService();
            const originInput = document.querySelector(".origin");
            const destinationInput = document.querySelector(".destination");
            const buttonSearch = document.querySelector(".buttonSearch");



            originInput.addEventListener('input',async (e)=>{
                console.log('change origin')
                this.setState({
                   inputOrigin: e.target.value,
                });
                buttonSearch.disabled = !((this.state?.inputOrigin) && (this.state?.inputDestination));
            })

            destinationInput.addEventListener('input',(e)=>{
                console.log('change destination')
                this.setState({
                   inputDestination: e.target.value,
                });
                buttonSearch.disabled = !((this.state?.inputOrigin) && (this.state?.inputDestination));

            })




            buttonSearch.addEventListener('click',async (e)=>{
                const geocoder =  new google.maps.Geocoder();

                async function coordinates(string){
                    let coord;
                   await geocoder.geocode( { 'address': string}, async function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            let lat = results[0].geometry.location.lat();
                            let lng = results[0].geometry.location.lng();
                            console.log({lat,lng});
                            coord = new google.maps.LatLng(lat,lng)
                        } else {
                            alert("Something got wrong " + status);
                        }
                    });
                   return coord;
                }

                let finalOrigin = await coordinates(this.state.inputOrigin)
                let finalDestination = await coordinates(this.state.inputDestination)
                await DirectionsService.route({
                    origin: finalOrigin,
                    destination: finalDestination,
                    travelMode: modeTraveling,
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result,
                        });
                    } else {
                        alert("can`t build directions, chose another points");
                    }
                });
            })
        }
    })
)(props =>
    <>
        <div className='input-container'>
                <label>
                  <p className='text-on-input'>  Point A </p>
                    <input className="origin"/>
                </label>
                <label>
                    <p className='text-on-input'>  Point B </p>
                    <input className="destination"/>
                </label>

            <button disabled={true} className="buttonSearch">Search</button>
            <Dropdown>
                <Dropdown.Toggle>
                   mode: {modeTraveling}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{
                        modeTraveling = 'DRIVING'
                    }} href="#/action-1">Driving</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{
                        modeTraveling = 'BICYCLING'
                    }} href="#/action-2">Bicycling</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{
                        modeTraveling = 'TRANSIT'
                    }} href="#/action-3">Transit</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{
                        modeTraveling = 'WALKING'
                    }} href="#/action-4">Walking</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
        </div>
        <GoogleMap
            defaultZoom={7}
            defaultCenter={new google.maps.LatLng(50.0000, 28.0000)}
        >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
        </GoogleMap>
        {props.directions?<Info directions={props.directions}/>:null}

    </>
);