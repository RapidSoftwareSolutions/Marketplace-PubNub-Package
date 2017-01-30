const Q = require('q');

module.exports = (req, res) => {
    const deferred = Q.defer();
    const { body, params } = req.body.args;

    if ( (!params.sub_key || !body.sub_key) || (params.sub_key !== body.sub_key) ) 
    	throw new RapidError('M_KEYS');

    const resp = {
        http_resp:  '',
        client_msg: body
    };

    deferred.resolve(resp);
    return deferred.promise;
}
