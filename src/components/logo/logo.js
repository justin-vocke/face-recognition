import React from 'react';
import brain from './brain.png';
import Tilt from 'react-tilt'
const Logo = () => {
  return (
    <div className="ma4 mt0">

      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 59, width: 59 }} >
       <div className="Tilt-inner">
        <img alt="logo" className="br2 shadow-2" src={brain} />
       </div>
      </Tilt>
    </div>



  )
}

export default Logo;
