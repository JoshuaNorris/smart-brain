import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain-logo.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="tilt br2 shadow-2" tiltMaxAngleX={30} tiltMaxAngleY={30} >
                <div className="pa3">
                    <img style={{paddingTop: '5px'}} className="brain" src={brain} alt="brain-logo" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;