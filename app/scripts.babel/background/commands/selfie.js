/**
 * getUserMedia Promise
 */
const getUserMedia =  () => {
    return new Promise( (resolve, reject) => {

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    navigator.getUserMedia({video: { width: 300, height: 300 } }, (stream) => {
        //video.src = window.URL.createObjectURL(stream);
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

const downloadFile = (url) => {
    return new Promise((resolve, reject)=>{
        if(!url){
            reject('Need to define an url to download a file!');
        }
        let link = document.createElement('a');
        link.download = 'name.png';
        link.href = url;
        link.click();
        resolve();
    });

};

/**
 * take a snapshot
 */

const takeSelfie = () => {
    // create needed objects to create a snapshot
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // static size cuz can't get the real size of the img
    canvas.height = 700;
    canvas.width = 700;


    // get local stream using getUserMedia API
    getUserMedia()
    .then( (stream) => {
        // associate a localstream to the video src attribute
        video.src = window.URL.createObjectURL(stream);
        setTimeout(() => {
           if (stream) {
               ctx.drawImage(video, 0, 0);
               let dataUrl = canvas.toDataURL('image/png');

               downloadFile(dataUrl)
               .then(()=>{
                   stopUserMedia(stream);
               });

            }
       }, 1000);
    } )
    .catch( (e)=>{
        throw e;
    } );
}

module.exports = {
    keywords: ['selfie'],
    fn: () => {
        return takeSelfie();
    }
};
