import React, {useEffect} from 'react';


function Header() {

useEffect(() =>{

    fetch('https://graphicks.atlassian.net/rest/api/3/project/search', {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${Buffer.from(
                'wanoplus@gmail.com:5VgMYOJ0tg9HmJy5ZlZh4261'
            ).toString('base64')}`,
            'Accept': 'application/json'
        }
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(`${err} YA YEBIU SOBAK`));
}, [])



    return(
        <h1>HUY</h1>
    )
}

export default Header;