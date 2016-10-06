'use strict';

navigator.webkitGetUserMedia(
    { audio: true, video: true },
    () => console.log('success'),
    () => console.log('error')
);
