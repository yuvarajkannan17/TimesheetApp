
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import chiselonLogo from '../Image/logochiselon.png'
import './Header.css'

import React, { useState, useEffect } from 'react';
function Header() {

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        // Update the currentDateTime state every second
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once after initial render

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }; const formattedDateTime = currentDateTime.toLocaleDateString(undefined, options);

    return (
        <>
           
           <div className='ti-navbar-bg'>
                <div className='ti-navbar-header d-flex text-white'>

                    <div className='first-half d-flex justify-content-between align-items-center '>
                        <div>
                            <Navbar.Brand href="#home">
                                <img
                                    src={chiselonLogo}
                                    width="35"
                                    height="35"
                                    className="d-inline-block align-top"
                                    alt="chiselon logo" />

                            </Navbar.Brand>
                        </div>
                        <div className='h2'>
                            Timesheet
                        </div>

                    </div>
                    <div className='seconds-half d-flex justify-content-end align-items-center '>
                        <div className='ti-time text-warning'>
                            {formattedDateTime}
                        </div>
                        <div className='h3 ti-sign-in'>
                            <a href='#' className='nav-link'>C</a>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Header;