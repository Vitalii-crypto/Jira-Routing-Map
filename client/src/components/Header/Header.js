import React from "react";
import './Header.css';
import {Nav, Navbar} from "react-bootstrap";


function Header() {

    return(
        <>
            <div className="header">
                <Navbar id='navbar' collapseOnSelect expand="lg">
                    <Navbar.Brand id="br"> VA
                    <span id='map'> MAPS </span>
                    </Navbar.Brand>
                    <Navbar.Toggle id='navtoggle' aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse  id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <div className='button-bg'>
                                <button className="buttonGroup"> Cart </button>
                                <button className='buttonGroup'> Shop </button>
                                <button className='buttonGroup'> About  </button>

                                <p id='logo-colapsed'>
                                    VA
                                </p>
                            </div>

                            <div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}
export default Header;