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
        uuid,
        to="to" } = req.body.args;

    let required = lib.parseReq({subscribeKey, uuid, channels});

    if(required.length > 0) 
        throw new RapidError('REQUIRED_FIELDS', required);

    if(channels!=undefined){
        if(typeof(channels)=="object"){
            channels = channels.join(", ");
        }
        channels = channels.split(", ");
    }

    let pubnub      = new PubNub({ subscribeKey }),
        stateObject = { uuid, channels };

    if(channelGroups!=channelGroups){
        if(typeof(channelGroups)=="object"){
            channelGroups = channelGroups.join(", ");
        }
        hereObject.channelGroups = channelGroups.split(", ")
    };

    if(authKey) 
        stateObject.authKey = authKey;
 
    pubnub.getState(
        stateObject,
        (status, response) => {
            if(status.error) defered.reject(status || response); 
            else defered.resolve(response);      
        }
    );

    return defered.promise;
}