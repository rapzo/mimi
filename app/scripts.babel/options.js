'use strict';

navigator.webkitGetUserMedia(
    { audio: true },
    () => console.log('success'),
    () => console.log('error')
);
