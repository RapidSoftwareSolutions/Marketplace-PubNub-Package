const _      = require('../lib/functions')
const PubNub = require('pubnub');

module.exports = (req, res) => {

	// rpt bug
	req.body.args = _.clearArgs(req.body.args);

	let { 
		subscribeKey, 
		publishKey,
		message,
		cipherKey,
		authKey,
		uuid=_.generateUUID(),
		channel,
		storeInHistory=false,
		sendByPost=false,
		meta,
		to="to" } = req.body.args;

	let r = {
        callback     : "",
        contextWrites: {}
    };

	if(!subscribeKey || !publishKey || !message) {
		_.echoBadEnd(r, to, res);
		return;
	}

	storeInHistory = storeInHistory == 'true' ? true : false;
	sendByPost     = sendByPost     == 'true' ? true : false;

	try {
		if(meta) meta = JSON.parse(meta);
		message       = JSON.parse(message);
	} catch(e) {
		r.contextWrites[to] = 'Invalid JSON.';
        r.callback = 'error'
		
        res.status(200).send(r);
		return;
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
    			  messageObject.channel   = _.generateUUID();

    if(cipherKey) messageObject.cipherKey = cipherKey;
    if(authKey)   messageObject.authKey   = authKey;
   	if(meta)      messageObject.meta      = meta;

   	console.log(messageObject);

    pubnub.publish(
	    messageObject,
	    (status, response) => {
	    	console.log(status, response)
	        if (status.error) {
	            r.contextWrites[to] = 'Error status: '+ status.statusCode;
            	r.callback = 'error'
	        } else {
	        	r.contextWrites[to] = 'Timetoken: '+ response.timetoken;
            	r.callback = 'success';
	        }

	        res.status(200).send(r);
	    }
	);
}