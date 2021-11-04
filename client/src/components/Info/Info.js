import React from 'react';
import './Info.css';


export default function Info(props){
    return(
        <div className='result-container'>
            <div className='result-text'>

                <p>Distance:{props.directions?.routes[0].legs[0].distance.text}</p>
                <p>Time:{props.directions?.routes[0].legs[0].duration.text}</p>
            </div>
        </div>
    )
}