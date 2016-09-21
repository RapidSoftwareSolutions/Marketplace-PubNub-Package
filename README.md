[create]:https://github.com/RapidSoftwareSolutions/Marketplace-PubNub-Package/blob/master/instructions/create.png?raw=true
[enable]:https://github.com/RapidSoftwareSolutions/Marketplace-PubNub-Package/blob/master/instructions/enable.png?raw=true

# PubNub Package
The PubNub Package can be used to build real time application based on the PubNub platform.
* Domain: pubnub.com
* Credentials: publishKey, subscribeKeyd

## How to get credentials: 
0. Login to PubNub
1. Enter a new app name and click on <kbd>Create new app</kbd>
![Creating new app][create]
2. Choose new app and <kbd>Create new keyset</kbd>
3. Copy and save your keyset credentials
4. Choose click on new keyset and enable `PRESENSE`, `STORAGE & PLAYBACK`
![Enable][enable]


## TOC: 
* [publishMessage](#publishMessage)
* [hereNow](#hereNow)
* [whereNow](#whereNow)
* [whereNow](#whereNow)
* [getUserState](#getUserState)
 
<a name="publishMessage"/>
## PubNub.publishMessage
Send a message to all channel subscribers.

| Field         | Type  | Description
|---------------|-------|----------
| publishKey    | String| The publish key obtained from PubNub.
| subscribeKey  | String| The subscribe key obtained from PubNub.
| message       | JOSN  | The destination of the message. Example: {"text": "Hello world"}
| cipherKey     | String| If passed, will encrypt the payloads.
| authKey       | String| If PAM enabled, this key will be used on all requests.
| uuid          | String| UUID to use, if not passed, a random will be generated.
| channel       | String| Publish extra meta with the request.
| storeInHistory| String| This parameter overrides default account configuration on message saving. `true` to Save, `false` to not save. Default is `true`.
| sendByPost    | String| If `true` the messages are stored in history. `true` to send via post. Default is `false`.
| meta          | JSON  | Publish extra meta with the request. Example:  {"cool": "meta"}

#### Request example
```json
{	"publishKey": "...",
	"subscribeKey": "...",
	"message": {"text": "Hello World!"}
}
```

#### Response example
```json
{
	"callback":"success",
	"contextWrites":{
		"#":{
			"to":"Timetoken: 14744516634751170c"
		}
	}
}
```

<a name="hereNow"/>
## PubNub.hereNow
Method description

| Field        | Type  | Description
|--------------|-------|----------
| subscribeKey | String| The subscribe key obtained from PubNub.
| cipherKey    | String| If passed, will encrypt the payloads.
| channels     | Array | Specifies the `channel` name to return occupancy results. If `channel` is not provided, `hereNow()` will return data for all `channels`. (`ch1`, `ch2`, `ch3`)
| channelGroups| Array | The channel group for which here now information should be received. (`ch1`, `ch2`, `ch3`)
| includeState | String| Setting state to `true` enables the return of subscriber state information. Default is `false`

#### Request example
```json
{	"subscribeKey": "...",
	"channels": "ch1, ch2",
	"includeState": true
}
```
#### Response example
```json
{
	"callback":"success",
	"contextWrites":{
		"#":{
			"to": {
			    "status" : 200,
			    "message" : "OK",
			    "service" : "Presence",
			    "uuids" : [
			        {
			            "uuid" : "myUUID0"
			        },
			        {
			            "state" : {
			                "abcd" : {
			                    "age" : 15
			                }
			            },
			            "uuid" : "myUUID1"
			        },
			        {
			            "uuid" : "b9eb408c-bcec-4d34-b4c4-fabec057ad0d"
			        },
			        {
			            "state" : {
			                "abcd" : {
			                    "age" : 15
			                }
			            },
			            "uuid" : "myUUID2"
			        },
			        {
			            "state" : {
			                "abcd" : {
			                    "age" : 24
			                }
			            },
			            "uuid" : "myUUID9"
			        }
			    ],
			    "occupancy" : 5
			}
		}
	}
}
```

<a name="whereNow"/>
## PubNub.whereNow
Method description

| Field       | Type  | Description
|-------------|-------|----------
| subscribeKey| String| The subscribe key obtained from PubNub.
| cipherKey   | String| If passed, will encrypt the payloads.
| authKey     | String| If PAM enabled, this key will be used on all requests.
| uuid        | String| UUID to use, if not passed, a random will be generated.

#### Request example
```json
{	"subscribeKey": "...",
	"cipherKey": "...",
	"authKey": "...",
	"uuid": "..."
}
```
#### Response example
```json
{
	"callback":"success",
	"contextWrites":{
		"#":{
			"to": {
				"channels": {
		            "ch1": {
		                "occupancy": 1,
		                ...
		            },
		            "ch2": {
		                "occupancy": 1,
		                ...
		            }
		        }
			}
		}
	}
}
```

<a name="getUserState"/>
## PubNub.getUserState
Method description

| Field        | Type  | Description
|--------------|-------|----------
| subscribeKey | String| The subscribe key obtained from PubNub.
| cipherKey    | String| If passed, will encrypt the payloads.
| authKey      | String| If PAM enabled, this key will be used on all requests.
| uuid         | String| UUID to use, if not passed, a random will be generated.
| channels     | Array | Specifies the `channel` name to return occupancy results. If `channel` is not provided, `hereNow()` will return data for all `channels`. (`ch1`, `ch2`, `ch3`)
| channelGroups| Array | The channel group for which here now information should be received. (`ch1`, `ch2`, `ch3`)

#### Request example
```json
{	"subscribeKey": "...",
	"uuid": "UID123",
	"channels": "ch1, ch2",
}
```
#### Response example
```json
{
	"callback":"success",
	"contextWrites":{
		"#":{
			"to": {
				"channels": {
		            "ch1": {
		                "occupancy": 1,
		                ...
		            },
		            "ch2": {
		                "occupancy": 1,
		                ...
		            }
		        }
			}		
		}
	}
}
```

