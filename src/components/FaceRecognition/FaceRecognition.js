import React from 'react';
import './FaceRecognition.css';
import { connect } from 'react-redux';

const FaceRecognition = ({ imageUrl, box }) => {

  return (
    <div className="center ma">
      <div className="absolute mt2">
        {console.log(box)}
        <img id="inputImage" alt="face recognition" src={imageUrl} width="500px" height='auto' />


        <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    </div>

  )
}

const mapStateToProps = state => ({

})


export default connect(
  mapStateToProps,
  null
)(FaceRecognition);
