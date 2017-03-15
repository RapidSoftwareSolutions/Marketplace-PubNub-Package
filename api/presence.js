const Q = require('q');

module.exports = (req, res) => {
    const deferred = Q.defer();
    const { body, params } = req.body.args;

    const found = params.filter(param => param.sub_key === body.sub_key);
    if (!found.length) throw new RapidError('M_KEYS');

    const resp = JSON.stringify({
        http_resp: "",
        client_msg: body,
        params: found
    });

    deferred.resolve(resp);
    return deferred.promise;
}
