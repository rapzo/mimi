const usermedia = require('../../common/usermedia.js');

module.exports = {
    keywords: ['selfie'],
    fn: () => {
        console.log('LETS TAKE A SELFIE');
        const options = true;
        return usermedia.getImage(options);
    }
};
