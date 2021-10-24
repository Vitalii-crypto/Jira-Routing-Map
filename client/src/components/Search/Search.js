import React, {useState} from 'react';
import './Search.css';

function Search() {


    const [placeInputs , setPlaceInputs] = useState([])
    const [count , setCount] = useState(1)


    const InputItem = () => <div className='row-container'>
        {setCount(count + 1)}
            <input className='search-input'/>

        <button className='del-button'
                onClick={HandleDeleteItem}
        > - point {count}</button>

    </div>


    function HandleDeleteItem() {
        placeInputs.filter((id => {
                return id !== id
            }
        ))}
    // console.log(HandleDeleteItem)


    return(
        <div className='input-search-container'>
            <button className='add-button'
                onClick={() => setPlaceInputs([...placeInputs, <InputItem/>])}
            >
                Add WayPoint
            </button>
            {placeInputs.map((input , id)=>{
                return <div>
                    {input}
                </div>
            })}
        </div>


    )


}

export default Search;