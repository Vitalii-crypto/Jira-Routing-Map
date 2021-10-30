import './App.css';
import React, { useState } from 'react';
import {MapWithADirectionsRenderer} from "./components/Map/Map";
import Search from "./components/Search/Search";

export const AppContext = React.createContext({});

function App() {
    const [tags, setTags] = useState([]);

    return (
        <>
            <AppContext.Provider value={{tags, setTags}}>

                <MapWithADirectionsRenderer/>
                <Search/>
            </AppContext.Provider>
        </>
    );
}

export default App;