import React from 'react';
// import Styles from '../styles'

function Photo (props) {
  return (
    <div className="AnalyzePhoto">
      <img id="photo" alt="Your photo" />
      <a href="#" className="AnalyzePhotoButton" onClick={props.onAnalyzePhoto}> Analyze Photo </a>
    </div>
  )
}

export default Photo
