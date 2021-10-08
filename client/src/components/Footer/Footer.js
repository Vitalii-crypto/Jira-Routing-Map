import React from "react";
import './Footer.css';

function Footer() {

    const year = new Date();

    return (

        <>
            <div className='footer'>
                <div className='left-footer'>
                    <p id='footer-text'> VA </p>
                    <p id='footer-time'> © 2001 - {year.getFullYear()} VA </p>
                </div>

                <div className='center-footer'>
                    <p id='light-text'> Navigation </p>
                    <p> Cart  </p>
                    <p> Shop   </p>
                    <p> About    </p>
                    <p> Mainpage  </p>

                </div>

                <div className='right-footer'>
                    <p id='light-text'> Contact Us </p>
                    <p>   <a id='a' href='https://www.instagram.com'>   Instagram    </a> </p>
                    <p>   <a id='a' href='https://uk-ua.facebook.com'>   FaceBook    </a> </p>
                    <p>   <a id='a' href='https://twitter.com/?lang=ru'>   Twitter    </a> </p>
                    <p>   <a id='a'  href='https://bitbucket.org/candv/task11/src/master/'>   Bitbucket  </a> </p>

                </div>
            </div>
        </>
    );
}

export default Footer;
