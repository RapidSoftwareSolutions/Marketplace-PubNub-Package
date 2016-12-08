const Q      = require('q');
const lib    = require('../lib/functions.js');
const PubNub = require('pubnub');

module.exports = (req, res) => {

    const defered = Q.defer();

    req.body.args = lib.clearArgs(req.body.args);

    let { 
        subscribeKey, 
        cipherKey,
        authKey,
        uuid,
        to="to" } = req.body.args;

    let required = lib.parseReq({subscribeKey, uuid});

    if(required.length > 0) 
        throw new RapidError('REQUIRED_FIELDS', required);

    let pubnub      = new PubNub({ subscribeKey }),
        whereObject = { uuid };

    if(cipherKey) whereObject.cipherKey = channels;
    if(authKey)   whereObject.authKey   = authKey;
 
    pubnub.whereNow(
        whereObject,
        (status, response) => {
            if(status.error) defered.reject(status || response); 
            else defered.resolve(response); 
        }
    );

    return defered.promise;
}