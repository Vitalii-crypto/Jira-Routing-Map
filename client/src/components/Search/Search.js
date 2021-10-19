import React, {useState} from 'react';
import './Search.css';

function Search() {


    const [placeInputs , setPlaceInputs] = useState([])
    const [count , setCount] = useState(1)


    const InputItem = () => <div className='row-container'>
        {setCount(count + 1)}
            <input className='search-input'/>
        <button className='del-button'
                onClick={()=>(
                    {...placeInputs.filter((id) => {
                            console.log(id !== id)
                        })
                    })}
        > - point {count}</button>

    </div>

    return(
        <div className='input-search-container'>
            <button className='add-button'
                onClick={() => setPlaceInputs([...placeInputs, <InputItem/>])}
            >
                Add WayPoint {count}
            </button>
            {placeInputs.map((input , id)=>{
                return <div>
                    id:{id}
                    {input}
                </div>
            })}
        </div>


    )


}

export default Search;