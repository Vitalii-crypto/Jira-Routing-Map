import React, { useContext, useRef } from 'react';
import { AppContext } from '../../App';
import './Search.css';



function InputTag(){
    const { tags, setTags } = useContext(AppContext);
    const tagInput = useRef(HTMLInputElement)

    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    }

    const inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (tags?.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([ ...tags, val ]);
            e.target.value = '';
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags?.length - 1);
        }
    };

    return (
        <div className='input-tag'>
            <ul className='input-tag__tags'>
                {tags && tags.map((tag, i) => (
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

                    <input
                        placeholder="Add waypoint"
                        className='waypoints'
                        type='text'
                        onKeyDown={inputKeyDown}
                        ref={tagInput}
                    />

                </li>
            </ul>
        </div>
    );
}

export default InputTag;

