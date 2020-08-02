import React from 'react';
import './imagelinkform.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, imageUrl }) => {
  return (
    <div className="ma4 mt0">
      <p className="f4">
        {'This magic brain detects faces in your pictures. Try it out :)'}
      </p>
      <div className="center">
        <div className="center form pa4 form br3 shadow-5">
          <input onChange={onInputChange} className="f4 pa2 w-70 center" type="text" />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>



  )
}

export default ImageLinkForm;
