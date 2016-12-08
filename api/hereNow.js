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
        channels,
        channelGroups,
        includeState=false,
        to="to" } = req.body.args;
        
    let required = lib.parseReq({subscribeKey});

    if(required.length > 0) 
        throw new RapidError('REQUIRED_FIELDS', required);

    channels     = channels ? channels.split(", ") : undefined;
    includeState = includeState == 'true' ? true : false;

    let pubnub = new PubNub({ subscribeKey });

    let hereObject = {
        includeState,
    };

    if(channelGroups) {
        hereObject.channelGroups = channelGroups.split(", ")
    };

    if(channels) hereObject.channels = channels;
    if(authKey)  hereObject.authKey  = authKey;
 
    pubnub.hereNow(
        hereObject,
        (status, response) => {
            if(status.error) defered.reject(status || response); 
            else defered.resolve(response);   
        }
    );

    return defered.promise;
}