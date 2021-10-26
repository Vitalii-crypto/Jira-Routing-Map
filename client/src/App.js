import './App.css';
import React from 'react';
import {MapWithADirectionsRenderer as Map} from "./components/Map/Map";
import Search from "./components/Search/Search";

function App() {
    return (
        <>
            <Map/>
            <Search/>
        </>
    );
}

export default App;
