import React from 'react';
// import styles from '../styles';

const Camera = (props) => {
  console.log("camera function");
  return(
    <div className="Camera">
      <video id="video"></video>
      <a href="#" className="StartButton" onClick={props.onStartClick}> Take photo</a>
    </div>
  )
}

export default Camera
