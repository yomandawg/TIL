# Video Streaming

| Streamer | Server | Viewer |
| - | - | - |
| Open Broadcaster Software (OBS) | Realtime Messaging Protocol (RTMP) | Browser |
| Provides the stream key | | |

* **OBS**(Open Broadcaster Software) - stream the desktop to RTMP


## RTMP (Realtime Messagin Protocol) Server with Node.js
> the Viewer(Browser) request a video feed with a stream id\
> `npm install node-media-server`\
```javascript
// Node-Media-Server - `npm install node-media-server`
const NodeMediaServer = require('node-media-server');
```

### http-flv
* *Flash* video player
  - browser: `http://localhost:8000/live/${STREAM_KEY}.flv`
  - broadcaster: `rtmp://localhost/live`, `STREAM_KEY`
* `flv.js` - `npm install flv.js`
```javascript
// cleanup after the stream is over
```