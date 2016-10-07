/**
 * getUserMedia Promise
 */
const getUserMedia =  (options) => {
    console.log('options-> ', options);
    return new Promise( (resolve, reject) => {

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    navigator.getUserMedia({video: options}, (stream) => {
        resolve(stream);
       }, (e) => {
           reject(e);
       });
   });
}

const stopUserMedia = (stream) => {
    let track = stream.getTracks()[0];
    track.stop();
};

/**
 * download file from an url
 */

const downloadFile = (elm, url) => {
    return new Promise((resolve, reject)=>{
        if(!url){
            reject('Need to define an url to download a file!');
        }

        elm.download = 'name.png';
        elm.href = url;
        elm.click();

        resolve();
    });

};

/**
 * take a snapshot
 */

const getImage = (options) => {
    console.log('getImage');
    // create needed objects to create a snapshot
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const link = document.createElement('a');

    const ctx = canvas.getContext('2d');
    // static size cuz can't get the real size of the img
    canvas.width = options.mandatory ? options.mandatory.maxWidth : 1280;
    canvas.height = options.mandatory ? options.mandatory.maxHeight : 720;

    // get local stream using getUserMedia API
    getUserMedia(options)
    .then( (stream) => {
        // associate a localstream to the video src attribute
        video.src = window.URL.createObjectURL(stream);
        setTimeout(() => {
           if (stream) {
               ctx.drawImage(video, 0, 0);
               let dataUrl = canvas.toDataURL('image/png');

               downloadFile(link, dataUrl)
               .then(()=>{
                   stopUserMedia(stream);
                   resetElements([video, canvas, link]);
               });

            }
       }, 1000);
    } )
    .catch( (e)=>{
        throw e;
    } );
}


const resetElements = (elements) => {
    elements.forEach((elm)=>{
        elm.remove();
    });
};

module.exports = {
    getImage
};
