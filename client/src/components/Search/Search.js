import React from 'react';
import './Search.css';


class InputTag extends React.Component {
    constructor() {
        super();

        this.state = {
            tags: [
                'Add Waypoints'
            ]
        };
    }

    removeTag = (i) => {
        const newTags = [ ...this.state.tags ];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ tags: [...this.state.tags, val]});
            this.tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.tags.length - 1);
        }
    }

    render() {
        const { tags } = this.state;

        return (
            <div className="input-tag">
                <ul className="input-tag__tags">
                    { tags.map((tag, i) => (
                        <li key={tag}
                        >
                            {tag}
                            <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                        </li>
                    ))}
                    <li className="input-tag__tags__input"><input className="waypoints" type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
                </ul>
            </div>
        );
    }
}
export default InputTag

// import React, {useState} from 'react';
// import './Search.css';
//
// function Search() {
//
//     const [placeInputs , setPlaceInputs] = useState([])
//     const [count , setCount] = useState(1)
//
//
//     const InputItem = (arr) => <div className='row-container'>
//         {setCount(count + 1)}
//             <input className='search-input'
//             />
//
//         <button className='del-button'
//                 onDelete={()=>setPlaceInputs([placeInputs !== placeInputs])}
//         > - point {count}</button>
//
//     </div>
//
//
//
//     return(
//         <div className='input-search-container'>
//             <button className='add-button'
//                 onClick={() => setPlaceInputs([...placeInputs, <InputItem/>])}
//             >
//                 Add WayPoint
//             </button>
//             {placeInputs.map((input , id)=>{
//                 return <div>
//                     {input}
//                 </div>
//             })}
//         </div>
//
//
//     )
//
//
// }
//
// export default Search;