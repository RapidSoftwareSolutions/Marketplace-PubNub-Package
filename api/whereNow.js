const _      = require('../lib/functions')
const PubNub = require('pubnub');

module.exports = (req, res) => {

	// rpt bug
	req.body.args = _.clearArgs(req.body.args);

	let { 
		subscribeKey, 
		cipherKey,
		authKey,
		uuid,
		to="to" } = req.body.args;

	let r = {
        callback     : "",
        contextWrites: {}
    };

	if(!subscribeKey || !uuid) {
		_.echoBadEnd(r, to, res);
		return;
	}

	let pubnub = new PubNub({ subscribeKey });

    let whereObject = {
        uuid,
    };

    if(cipherKey) whereObject.cipherKey = channels;
    if(authKey)   whereObject.authKey   = authKey;
 
    pubnub.whereNow(
	    whereObject,
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