module.exports.do = function(req, res){
    res.status(200).send({
        'package': 'PubNub',
        "tagline": "PubNub API Package",
        "keywords": ["API", "iot", "message", "messaging", "subscription"],
        "description": "The PubNub Package can be used to build real time application based on the PubNub platform.",
        'image': 'https://www.pubnub.com/wp-content/uploads/2016/04/pubnub-share.png',
        'repo': 'https://github.com/RapidSoftwareSolutions/marketplace-pubnub-package',
        'accounts': {
            'domain': 'pubnub.com',
            'credentials': [
                'subscribeKey', 'publishKey'
            ]
        },
        'events': [
            {
                "name": "presence",
                "description": "This method is called when various actions are done in a specified channel",
                "payload": {
                    "uuid": 'uuid',
                    "timestamp": 123456789,
                    "sub_key": 'sub-a-bcd123efg456-hijk7890',
                    "status": 'success',
                    "occupancy": 2,
                    "channel": 'Channel-name',
                    "action": 'join'
                },
                "steps": [
                    "Under the 'Application add-ons' section, enable 'Presence'",
                    "Set all callback URLs to the following: __WEBHOOK_URL__"
                ],
                'args': [
                    {
                        'name': 'subscriptionKey',
                        'type': 'string',
                        'info': 'Subscription key',
                        'required': true
                    },
                    {
                        'name': 'channel',
                        'type': 'string',
                        'info': 'Name of the channel',
                        'required': true
                    }
                ]
            }
        ],
        'blocks': [{
            "name":"publishMessage",
            "description": "Send a message to all channel subscribers.",
            "args":[
                {
                    name: "publishKey",
                    type: "credentials",
                    info: "Required: The publish key obtained from PubNub.",
                    required: true
                },
                {
                    name: "subscribeKey",
                    type: "credentials",
                    info: "Required: The subscribe key obtained from PubNub.",
                    required: true
                },
                {
                    name: "message",
                    type: "JSON",
                    info: "Required: The destination of the message. Example: {\"text\": \"Hello world\"}",
                    required: true
                },
                {
                    name: "cipherKey",
                    type: "String",
                    info: "If passed, will encrypt the payloads.",
                    required: false
                },                
                {
                    name: "authKey",
                    type: "String",
                    info: "If PAM enabled, this key will be used on all requests.",
                    required: false
                },
                {
                    name: "uuid",
                    type: "String",
                    info: "UUID to use, if not passed, a random will be generated.",
                    required: false
                },  
                {
                    name: "channel",
                    type: "String",
                    info: "Publish extra meta with the request.",
                    required: false
                },
                {
                    name: "storeInHistory",
                    type: "String", //Boolean
                    info: "This parameter overrides default account configuration on message saving. `true` to Save, `false` to not save. Default is `true`.",
                    required: false
                },
                {
                    name: "sendByPost",
                    type: "String", //Boolean
                    info: "If `true` the messages are stored in history. `true` to send via post. Default is `false`.",
                    required: false
                },
                {
                    name: "meta",
                    type: "JSON",
                    info: "Publish extra meta with the request. Example:  {\"cool\": \"meta\"}",
                    required: false
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
            "description": "Obtain information about the current state of a channel including a list of unique user-ids currently subscribed to the channel and the total occupancy count of the channel.",
            "args":[
                {
                    name: "subscribeKey",
                    type: "credentials",
                    info: "Required: The subscribe key obtained from PubNub.",
                    required: true
                },
                {
                    name: "cipherKey",
                    type: "String",
                    info: "If passed, will encrypt the payloads.",
                    required: false
                },
                {
                    name: "channels",
                    type: "Array",
                    info: "Specifies the `channel` name to return occupancy results. If `channel` is not provided, `hereNow()` will return data for all `channels`. (`ch1`, `ch2`, `ch3`)",
                    required: false
                },
                {
                    name: "channelGroups",
                    type: "Array",
                    info: "The channel group for which here now information should be received. (`ch1`, `ch2`, `ch3`)",
                    required: false
                },
                {
                    name: "includeState",
                    type: "String", //Boolean
                    info: "Setting state to `true` enables the return of subscriber state information. Default is `false`",
                    required: false
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
            "description": "You can obtain information about the current list of a channels to which a uuid is subscribed to by calling the whereNow function in your application.",
            "args":[
                {
                    name: "subscribeKey",
                    type: "credentials",
                    info: "Required: The subscribe key obtained from PubNub.",
                    required: true
                },
                {
                    name: "cipherKey",
                    type: "String",
                    info: "If passed, will encrypt the payloads.",
                    required: false
                },
                {
                    name: "authKey",
                    type: "String",
                    info: "If PAM enabled, this key will be used on all requests.",
                    required: false
                },
                {
                    name: "uuid",
                    type: "String",
                    info: "Required: UUID to use, if not passed, a random will be generated.",
                    required: true
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
            "description": "The state API is used to get key/value pairs specific to a subscriber uuid.",
            "args":[
                {
                    name: "subscribeKey",
                    type: "credentials",
                    info: "Required: The subscribe key obtained from PubNub.",
                    required: true
                },
                {
                    name: "cipherKey",
                    type: "String",
                    info: "If passed, will encrypt the payloads.",
                    required: false
                },
                {
                    name: "authKey",
                    type: "String",
                    info: "If PAM enabled, this key will be used on all requests.",
                    required: false
                },
                {
                    name: "uuid",
                    type: "String",
                    info: "Required: UUID to use, if not passed, a random will be generated.",
                    required: true
                },  
                {
                    name: "channels",
                    type: "Array",
                    info: "Required: Specifies the `channel` name to return occupancy results. If `channel` is not provided, `hereNow()` will return data for all `channels`. (`ch1`, `ch2`, `ch3`)",
                    required: true
                },
                {
                    name: "channelGroups",
                    type: "Array",
                    info: "The channel group for which here now information should be received. (`ch1`, `ch2`, `ch3`)",
                    required: false
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
