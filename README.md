# webcaster

## Install
1) **NPM**
    * `npm install webcaster --save`
2) **YARN**
	* `yarn add webcaster`
3) **GIT**
    * `git clone https://github.com/d-pollard/webcaster.git`

## Usage
```javascript
// Initiate webcast
var webcaster = require('webcaster');

// A list of available status codes you can listen to for updates on stream health
var { STREAM_STATUS, SESSION_STATUS } = webcaster.getStatusCodes();

// Configure the settings for the stream
Webcaster.setSettings(
  'videoDivId',
  'phoner WSS link',
  'RTMP url',
  'RTMP channel',
  'A callback function for updates'
);

// Launch a livestream
Webcaster.beginLiveStream();

// End a livesstream
Webcaster.stopLiveStream();
```
  
## Contributors
* Derek Pollard <derek@sweet.io>, <dpollard@mail.bradley.edu>