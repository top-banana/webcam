import React from 'react';

function CaptureImage (props) {
  return (
    <div className="booth">
      <video id="video" src=""  width="400" height="300" ></video>
      <a href="#" class="booth-capture-button" id="capture">Take photo</a>
      <canvas></canvas>
      <img id="photo" src="" width="400" height="300"  />
    </div>
  )
}

export default CaptureImage;
