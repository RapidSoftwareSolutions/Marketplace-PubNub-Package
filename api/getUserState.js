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
		uuid,
		to="to" } = req.body.args;

	let r = {
        callback     : "",
        contextWrites: {}
    };

	if(!subscribeKey || !uuid || !channels) {
		_.echoBadEnd(r, to, res);
		return;
	}

	channels = channels ? channels.split(", ") : undefined;

	let pubnub = new PubNub({ subscribeKey });

    let stateObject = {
        uuid,
        channels
    };

    if(channelGroups) {
    	stateObject.channelGroups   = channelGroups.split(", ")
    };
    if(authKey) stateObject.authKey = authKey;
 
    pubnub.getState(
	    stateObject,
	    (status, response) => {
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