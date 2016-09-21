const _      = require('../lib/functions')
const PubNub = require('pubnub');

module.exports = (req, res) => {

	// rpt bug
	req.body.args = _.clearArgs(req.body.args);

	let { 
		subscribeKey, 
		cipherKey,
		authKey,
		channels,
		channelGroups,
		includeState=false,
		to="to" } = req.body.args;

	let r = {
        callback     : "",
        contextWrites: {}
    };

	if(!subscribeKey) {
		_.echoBadEnd(r, to, res);
		return;
	}

	channels = channels ? channels.split(", ") : undefined;

	includeState = includeState == 'true' ? true : false;

	let pubnub = new PubNub({ subscribeKey });

    let hereObject = {
        includeState,
    };

    if(channelGroups) {
    	hereObject.channelGroups = channelGroups.split(", ")
    };

    if(channels)      hereObject.channels      = channels;
    if(authKey)       hereObject.authKey       = authKey;
 
    pubnub.hereNow(
	    hereObject,
	    (status, response) => {
	    	console.log(status, response)
	        if (status.error) {
	            r.contextWrites[to] = 'Error status: '+ status.statusCode;
            	r.callback = 'error'
	        } else {
	        	r.contextWrites[to] = JSON.stringify(response);
            	r.callback = 'success';
	        }

	        res.status(200).send(r);
	    }
	);
}