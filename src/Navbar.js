import React, { useState, useEffect } from 'react'
import "./Navbar.css"

function Navbar() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, [])
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo" src="" alt="Netflix logo" />
            <img className="nav__avtar" src="" alt="Netflix avtar" />
        </div>
    )
}

export default Navbar
