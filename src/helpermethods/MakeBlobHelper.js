var dotenv = require('dotenv');
var axios = require('axios');

function makeBlob(dataURL) {
  //  console.log("MakeBlobHelper");
   const BASE64_MARKER = ';base64,';
   if (dataURL.indexOf(BASE64_MARKER) === -1) {
     // console.log("number 1 end of MakeBlob");
       const parts = dataURL.split(',');
       const contentType = parts[0].split(':')[1];
       const raw = decodeURIComponent(parts[1]);
       // console.log("number 2 end of MakeBlob");
       return new Blob([raw], {
           type: contentType
       });
   }

   const parts = dataURL.split(BASE64_MARKER);
   const contentType = parts[0].split(':')[1];
   const raw = window.atob(parts[1]);
   const rawLength = raw.length;
   console.log("number 3 end of MakeBlob");
   const uInt8Array = new Uint8Array(rawLength);
   for (let i = 0; i < rawLength; i++) {
       uInt8Array[i] = raw.charCodeAt(i);
   }
   console.log("number 4 end of MakeBlob");
   return new Blob([uInt8Array], {
       type: contentType
   });
}

const helpers = {
  makeBlobHelper: function (dataURL) {
    console.log("make blob");
    console.log(dataURL);

    axios.post("https://westus.api.cognitive.microsoft.com/emotion/v1.0", {
      data: makeBlob(dataURL),
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': dotenv.emotion_api_key
        }
    }).then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log("error in fetch request:" + error))
    }

  //   fetch("https://westus.api.cognitive.microsoft.com/emotion/v1.0", {
  //     method: 'POST',
  //     data: makeBlob(dataURL),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Ocp-Apim-Subscription-Key': dotenv.emotion_api_key
  //     }
  //   }).then(response => response.json())
  //     .then(json => console.log(json);)
  //     .catch(error => console.log("error in fetch request:" + error))
  // }

}

export default helpers
