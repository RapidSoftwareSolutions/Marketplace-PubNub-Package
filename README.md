[![](https://scdn.rapidapi.com/RapidAPI_banner.png)](https://rapidapi.com/package/PubNub/functions?utm_source=RapidAPIGitHub_PubNubFunctions&utm_medium=button&utm_content=RapidAPI_GitHub)

[create]:https://github.com/RapidSoftwareSolutions/Marketplace-PubNub-Package/blob/master/instructions/create.png?raw=true
[enable]:https://github.com/RapidSoftwareSolutions/Marketplace-PubNub-Package/blob/master/instructions/enable.png?raw=true

# PubNub Package
The PubNub Package can be used to build real time application based on the PubNub platform.
* Domain: pubnub.com
* Credentials: `subscribeKey`, `publishKey`, `cipherKey`, `authKey`

## How to get credentials: 
0. Login to PubNub
1. Enter a new app name and click on <kbd>Create new app</kbd>
![Creating new app][create]
2. Choose new app and <kbd>Create new keyset</kbd>
3. Copy and save your keyset credentials
4. Choose click on new keyset and enable `PRESENSE`, `STORAGE & PLAYBACK`
![Enable][enable]
 
## Custom datatypes:
 |Datatype|Description|Example
 |--------|-----------|----------
 |Datepicker|String which includes date and time|```2016-05-28 00:00:00```
 |Map|String which includes latitude and longitude coma separated|```50.37, 26.56```
 |List|Simple array|```["123", "sample"]```
 |Select|String with predefined values|```sample```
 |Array|Array of objects|```[{"Second name":"123","Age":"12","Photo":"sdf","Draft":"sdfsdf"},{"name":"adi","Second name":"bla","Age":"4","Photo":"asfserwe","Draft":"sdfsdf"}] ```

## PubNub.publishMessage
Send a message to all channel subscribers.

| Field         | Type       | Description
|---------------|------------|----------
| publishKey    | credentials| Required: The publish key obtained from PubNub.
| subscribeKey  | credentials| Required: The subscribe key obtained from PubNub.
| message       | JOSN       | Required: The destination of the message. Example: {"text": "Hello world"}
| cipherKey     | String     | If passed, will encrypt the payloads.
| authKey       | String     | If PAM enabled, this key will be used on all requests.
| uuid          | String     | UUID to use, if not passed, a random will be generated.
| channel       | String     | Publish extra meta with the request.
| storeInHistory| String     | This parameter overrides default account configuration on message saving. `true` to Save, `false` to not save. Default is `true`.
| sendByPost    | String     | If `true` the messages are stored in history. `true` to send via post. Default is `false`.
| meta          | JSON       | Publish extra meta with the request. Example:  {"cool": "meta"}

#### Request example
```json
{	"publishKey": "...",
	"subscribeKey": "...",
	"message": {"text": "Hello World!"}
}
```

## PubNub.hereNow
Obtain information about the current state of a channel including a list of unique user-ids currently subscribed to the channel and the total occupancy count of the channel.

| Field        | Type       | Description
|--------------|------------|----------
| subscribeKey | credentials| Required: The subscribe key obtained from PubNub.
| cipherKey    | String     | If passed, will encrypt the payloads.
| channels     | List      | Specifies the `channel` name to return occupancy results. If `channel` is not provided, `hereNow()` will return data for all `channels`. (`ch1`, `ch2`, `ch3`)
| channelGroups| List      | The channel group for which here now information should be received. (`ch1`, `ch2`, `ch3`)
| includeState | String     | Setting state to `true` enables the return of subscriber state information. Default is `false`

#### Request example
```json
{	"subscribeKey": "...",
	"channels": "ch1, ch2",
	"includeState": true
}
```

## PubNub.whereNow
You can obtain information about the current list of a channels to which a uuid is subscribed to by calling the whereNow function in your application.

| Field       | Type       | Description
|-------------|------------|----------
| subscribeKey| credentials| Required: The subscribe key obtained from PubNub.
| cipherKey   | String     | If passed, will encrypt the payloads.
| authKey     | String     | If PAM enabled, this key will be used on all requests.
| uuid        | String     | Required: UUID to use, if not passed, a random will be generated.

## PubNub.getUserState
The state API is used to get key/value pairs specific to a subscriber uuid.

| Field        | Type       | Description
|--------------|------------|----------
| subscribeKey | credentials| Required: The subscribe key obtained from PubNub.
| cipherKey    | String     | If passed, will encrypt the payloads.
| authKey      | String     | If PAM enabled, this key will be used on all requests.
| uuid         | String     | Required: UUID to use, if not passed, a random will be generated.
| channels     | List      | Specifies the `channel` name to return occupancy results. If `channel` is not provided, `hereNow()` will return data for all `channels`. (`ch1`, `ch2`, `ch3`)
| channelGroups| List      | The channel group for which here now information should be received. (`ch1`, `ch2`, `ch3`)

#### Request example
```json
{	"subscribeKey": "...",
	"uuid": "UID123",
	"channels": "ch1, ch2",
}
```
