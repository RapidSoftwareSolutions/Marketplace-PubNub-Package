module.exports.do = function(req, res){
    console.log('req')
    res.status(200).send({
        'package': '',
        "tagline": "PubNub Package",
        "description": "The Instagram Package can be used to build real time application based on the PubNub platform.",
        'image': 'https://www.pubnub.com/wp-content/uploads/2016/04/pubnub-share.png',
        'repo': 'https://github.com/RapidSoftwareSolutions/marketplace-pubnub-package',
        'accounts': {
            'domain': 'pubnub.com',
            'credentials': [
                'publishKey',
                'subscribeKey',
                'secretKey'
            ]
        },
        'blocks': [{
            "name":"publishMessage",
            "args":[
                {
                    name: "publishKey",
                    type: "String",
                    info: "The publish key obtained from Instagram.",
                },
                {
                    name: "subscribeKey",
                    type: "String",
                    info: "The subscribe key obtained from Instagram.",
                },
                {
                    name: "message",
                    type: "String",
                    info: "The destination of the message.",
                },
                {
                    name: "cipherKey",
                    type: "String",
                    info: "If passed, will encrypt the payloads.",
                },                
                {
                    name: "authKey",
                    type: "String",
                    info: "If PAM enabled, this key will be used on all requests.",
                },
                {
                    name: "uuid",
                    type: "String",
                    info: "UUID to use, if not passed, a random will be generated.",
                },  
                {
                    name: "channel",
                    type: "String",
                    info: "Publish extra meta with the request.",
                },
                {
                    name: "storeInHistory",
                    type: "String", //Boolean
                    info: "This parameter overrides default account configuration on message saving. `true` to Save, `false` to not save. Default is `true`.",
                },
                {
                    name: "sendByPost",
                    type: "String", //Boolean
                    info: "If `true` the messages are stored in history. `true` to send via post. Default is `false`.",
                },
                {
                    name: "meta",
                    type: "JSON",
                    info: "Publish extra meta with the request. Example:  {\"cool\": \"meta\"}",
                }
            ], 
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success => timetocken field'
                }
            ]
        }, {
            "name":"hereNow",
            "args":[
                {
                    name: "subscribeKey",
                    type: "String",
                    info: "The subscribe key obtained from Instagram.",
                },
                {
                    name: "cipherKey",
                    type: "String",
                    info: "If passed, will encrypt the payloads.",
                },
                {
                    name: "channels",
                    type: "Array",
                    info: "Specifies the `channel` name to return occupancy results. If `channel` is not provided, `hereNow()` will return data for all `channels`. (`ch1`, `ch2`, `ch3`)",
                },
                {
                    name: "channelGroups",
                    type: "Array",
                    info: "The channel group for which here now information should be received. (`ch1`, `ch2`, `ch3`)",
                },
                {
                    name: "includeState",
                    type: "String", //Boolean
                    info: "Setting state to `true` enables the return of subscriber state information. Default is `false`",
                }
            ], 
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success => channels: Array <string>'
                }
            ]
        }, {
            "name":"whereNow",
            "args":[
                {
                    name: "subscribeKey",
                    type: "String",
                    info: "The subscribe key obtained from Instagram.",
                },
                {
                    name: "cipherKey",
                    type: "String",
                    info: "If passed, will encrypt the payloads.",
                },
                {
                    name: "authKey",
                    type: "String",
                    info: "If PAM enabled, this key will be used on all requests.",
                },
                {
                    name: "uuid",
                    type: "String",
                    info: "UUID to use, if not passed, a random will be generated.",
                },  
            ], 
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success => channels: Array <string>'
                }
            ]
        }, {
            "name":"whereNow",
            "args":[
                {
                    name: "subscribeKey",
                    type: "String",
                    info: "The subscribe key obtained from Instagram.",
                },
                {
                    name: "cipherKey",
                    type: "String",
                    info: "If passed, will encrypt the payloads.",
                },
                {
                    name: "authKey",
                    type: "String",
                    info: "If PAM enabled, this key will be used on all requests.",
                },
                {
                    name: "uuid",
                    type: "String",
                    info: "UUID to use, if not passed, a random will be generated.",
                },  
            ], 
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success => channels: Array <string>'
                }
            ]
        }, {
            "name":"getUserState",
            "args":[
                {
                    name: "subscribeKey",
                    type: "String",
                    info: "The subscribe key obtained from Instagram.",
                },
                {
                    name: "cipherKey",
                    type: "String",
                    info: "If passed, will encrypt the payloads.",
                },
                {
                    name: "authKey",
                    type: "String",
                    info: "If PAM enabled, this key will be used on all requests.",
                },
                {
                    name: "uuid",
                    type: "String",
                    info: "UUID to use, if not passed, a random will be generated.",
                },  
                {
                    name: "channels",
                    type: "Array",
                    info: "Specifies the `channel` name to return occupancy results. If `channel` is not provided, `hereNow()` will return data for all `channels`. (`ch1`, `ch2`, `ch3`)",
                },
                {
                    name: "channelGroups",
                    type: "Array",
                    info: "The channel group for which here now information should be received. (`ch1`, `ch2`, `ch3`)",
                },
            ], 
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success => channels: Array <string>'
                }
            ]
        }]
    })
};
