const Q = require('Q');

module.exports = (req, res) => {
    const deferred = Q.defer();
    const { body, params } = req.body.args;

    const found = params.find(param => param.sub_key === body.sub_key);
    if (!found) throw new RapidError('M_KEYS');

    const resp = JSON.stringify({
        http_resp: "",
        client_msg: body,
        token: found._rapid_sock_token
    });

    deferred.resolve(resp);
    return deferred.promise;
}
