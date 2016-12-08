const Q      = require('q');
const lib    = require('../lib/functions.js');
const PubNub = require('pubnub');

module.exports = (req, res) => {

    const defered = Q.defer();

    req.body.args = lib.clearArgs(req.body.args);

    let { 
        subscribeKey, 
        publishKey,
        message,
        cipherKey,
        authKey,
        uuid=lib.generateUUID(),
        channel,
        storeInHistory=false,
        sendByPost=false,
        meta,
        to="to" } = req.body.args;

    let required = lib.parseReq({subscribeKey, publishKey, message});

    if(required.length > 0) 
        throw new RapidError('REQUIRED_FIELDS', required);

    storeInHistory = storeInHistory == 'true' ? true : false;
    sendByPost     = sendByPost     == 'true' ? true : false;

    try {
        if(meta && typeof meta == 'string') meta = JSON.parse(meta);
        if(typeof message == 'string') message = JSON.parse(message);
    } catch(e) {
         throw new RapidError('JSON_VALIDATION');
    }

    let pubnub = new PubNub({ publishKey, subscribeKey });

    let messageObject = {
        message,
        sendByPost,
        storeInHistory,
        uuid,
        channel
    };

    if(!messageObject.channel)  
                  messageObject.channel   = lib.generateUUID();

    if(cipherKey) messageObject.cipherKey = cipherKey;
    if(authKey)   messageObject.authKey   = authKey;
    if(meta)      messageObject.meta      = meta;

    pubnub.publish(
        messageObject,
        (status, response) => {
            if(status.error) defered.reject(status || response); 
            else defered.resolve(response); 
        }
    );

    return defered.promise;
}