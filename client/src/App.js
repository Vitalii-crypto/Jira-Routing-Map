import './App.css';
import React from 'react';
import {MapWithADirectionsRenderer as Map} from "./components/Map/Map";
import Search from "./components/Search/Search";
import Header from "./components/Header/Header";


function App() {
    return (
        <>
            <Header/>
            <Map/>
            <Search/>
        </>
    );
}

export default App;
