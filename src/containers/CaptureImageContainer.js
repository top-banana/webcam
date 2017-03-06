import React, { Component } from 'react';
import Camera from '../components/Camera';
import Photo from '../components/Photo';
import MakeBlobHelper from '../helpermethods/MakeBlobHelper';
import Styles from '../styles';
import dotenv from 'dotenv';

class CaptureImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      constraints: {
        audio: false,
        video: {width: 400, height: 300}
      },
      dataURL: '',
      imgJSON: {}
    }
    this.handleStartClick = this.handleStartClick.bind(this);
    this.takePhoto= this.takePhoto.bind(this);
    this.handleAnalyzePhoto= this.handleAnalyzePhoto.bind(this);
    this.clearPhoto = this.clearPhoto.bind(this);
  }

  componentDidMount() {
    const vendorURL = window.URL || window.webkitURL;
    const video = document.querySelector('video');
    const constraints = this.state.constraints;

    navigator.getMedia = navigator.webkitGetUserMedia||
                     navigator.getUserMedia  ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia

    const getUserMedia = (params) => {
      return new Promise((successCallback, errorCallback) => {
        navigator.getMedia(params, successCallback, errorCallback)
      })
    }

    // Call the getUserMedia method with our callback functions
    // video.src = vendorURL.createObjectURL(stream)
    // video.play()

    getUserMedia(constraints)
    .then(function (stream) {
      if (video.mozSrcObject !== undefined) {
      video.mozSrcObject = stream;
    } else {
       video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
    }
     video.play();
   }).catch((error) => {
      console.log(error);
    });
    this.clearPhoto();
  }

  clearPhoto() {
    const canvas = document.querySelector('canvas');
    const video = document.querySelector('video');
    const photo = document.getElementById('photo');
    const context = canvas.getContext('2d');
    const { width, height } = this.state.constraints.video;
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, width, height);

    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  handleStartClick(event) {
    event.preventDefault();
    this.takePhoto();
  }

  takePhoto() {
    console.log("inside take photo function");
    console.log(this.state.dataURL);
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');
    const photo = document.getElementById('photo');
    const context = canvas.getContext('2d');
    const { width, height } = this.state.constraints.video;
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const dataURL = canvas.toDataURL('image/png', 1.0);
    console.log("logging dataURL", dataURL);
    photo.setAttribute('src', dataURL);
    // The data returned from the toDataURL() function is a string that represents an encoded URL containing the grabbed graphical data
    this.setState({
      dataURL: dataURL
    })
  }

  handleAnalyzePhoto() {
    console.log("inside handleAnalyzePhoto checking state", this.state.dataURL);
    MakeBlobHelper.makeBlobHelper(this.state.dataURL);
    this.setState({
      imgJSON: JSON
    })
  }

  render() {
    return (
      <div className="Capture">
        <Camera onStartClick={this.handleStartClick} />
        <canvas id="canvas"></canvas>
        <Photo onAnalyzePhoto={this.handleAnalyzePhoto} />
      </div>
    )
  }
}

export default CaptureImageContainer
