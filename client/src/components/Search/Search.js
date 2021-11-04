import React, {useContext, useRef, useState} from 'react';
import {Autocomplete} from '@react-google-maps/api';
import {AppContext} from '../../App';
import './Search.css';
import {compose, withProps} from 'recompose';
import withScriptjs from 'react-google-maps/lib/withScriptjs';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';


const Search = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: '1%'}}/>,
        containerElement: <div style={{height: '1px'}}/>,
        mapElement: <div style={{height: '1%'}}/>,
        mapId: 'c8d3fb7368eb6e72',
    }),
    withScriptjs,
    withGoogleMap
)(() => {
    const {tags, setTags} = useContext(AppContext);
    // eslint-disable-next-line no-unused-vars
    const [inputOrigin, setInputOrigin] = useState(null);

    const tagInput = useRef(HTMLInputElement);

    const onOriginInputChange = (e) => {
        setInputOrigin(e.target.value);
    };

    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    };

    const inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (tags?.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([...tags, val]);
            e.target.value = '';
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags?.length - 1);
        }
    };

    return (
        <div className='input-tag'>
            <ul className='input-tag__tags'>
                {tags &&
                tags.map((tag, i) => (
                    <li key={tag}>
                        {tag}
                        <button
                            type='button'
                            onClick={() => {
                                removeTag(i);
                            }}
                        >
                            +
                        </button>
                    </li>
                ))}
                <li className='input-tag__tags__input'>
                    <Autocomplete
                        onPlaceChanged={(e) => {
                            onOriginInputChange({target: tagInput.current});
                        }}
                    >
                        <input
                            placeholder='Add waypoint'
                            className='waypoints'
                            type='text'
                            onKeyDown={inputKeyDown}
                            ref={tagInput}
                        />
                    </Autocomplete>
                </li>
            </ul>
        </div>
    );
});

export default Search;

// import React, { useContext, useRef } from 'react';
// import { AppContext } from '../../App';
// import './Search.css';
//
//
//
// function InputTag(){
//     const { tags, setTags } = useContext(AppContext);
//     const tagInput = useRef(HTMLInputElement)
//
//     const removeTag = (i) => {
//         const newTags = [...tags];
//         newTags.splice(i, 1);
//         setTags(newTags);
//     }
//
//     const inputKeyDown = (e) => {
//         const val = e.target.value;
//         if (e.key === 'Enter' && val) {
//             if (tags?.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
//                 return;
//             }
//             setTags([ ...tags, val ]);
//             e.target.value = '';
//         } else if (e.key === 'Backspace' && !val) {
//             removeTag(tags?.length - 1);
//         }
//     };
//
//     return (
//         <div className='input-tag'>
//             <ul className='input-tag__tags'>
//                 {tags && tags.map((tag, i) => (
//                     <li key={tag}>
//                         {tag}
//                         <button
//                             type='button'
//                             onClick={() => {
//                                 removeTag(i);
//                             }}
//                         >
//                             +
//                         </button>
//                     </li>
//                 ))}
//                 <li className='input-tag__tags__input'>
//
//                     <input
//                         placeholder="Add waypoint"
//                         className='waypoints'
//                         type='text'
//                         onKeyDown={inputKeyDown}
//                         ref={tagInput}
//                     />
//
//                 </li>
//             </ul>
//         </div>
//     );
// }
//
// export default InputTag;
//
