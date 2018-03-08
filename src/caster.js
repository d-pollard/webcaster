const browser = require('./browser');
const Phoner = require('flashphoner-api');

function caster() {
  var session, stream, phoner, constants, $$ = this, status = 'ready', videoSource, socketSource, rtmp_url, rtmp_channel, sc;
  var sc_arr = [];

  $$.init = function () {
    phoner = Phoner;
    constants = phoner.constants;
    initPhoner();
  };

  $$.init();

  /**
   *
   * Bellow this line contains all of our public methods
   * that the user can use to manipulate the api
   *
   */
  $$.getVideoSource  = function () {
    return videoSource;
  };
  $$.getSocketSource = function () {
    return socketSource;
  };
  $$.getRTMPurl      = function () {
    return rtmp_url;
  };
  $$.getRTMPchannel  = function() {
    return rtmp_channel;
  };
  $$.getStatusCar    = function () {
    return sc;
  };
  $$.getStatusCodes  = function () {
    return constants;
  };

  $$.setVideoSource  = function (elementID) {
    try {
      videoSource = document.getElementById(elementID);
    } catch (e) {
      throw new Error('[Caster] - Cannot find an element on the page with id of ' + elementID);
    }
  };
  $$.setSocketSource = function (socketURL) {
    try {
      socketSource = socketURL;
    } catch (e) {
      throw new Error('[Caster] - cannot set socket source. Please try again.');
    }
  };
  $$.setRTMPurl      = function (liveStreamUrl) {
    try {
      rtmp_url = liveStreamUrl;
    } catch (e) {
      throw new Error('[Caster] - Could not set the (rtmp) live stream url.');
    }
  };
  $$.setRTMPchannel  = function (liveStreamChannel) {
    try {
      rtmp_channel = liveStreamChannel;
    } catch (e) {
      throw new Error('[Caster] - Tried to set RTMP url, but could not. Try again.');
    }
  };
  $$.setStatusCar    = function (statusCar) {
    sc = statusCar;
  };
  $$.setSettings     = function (elementID, socketURL, liveStreamUrl, liveStreamChannel, statusCar) {
    $$.setVideoSource(elementID);
    $$.setSocketSource(socketURL);
    $$.setRTMPchannel(liveStreamChannel);
    $$.setRTMPurl(liveStreamUrl);
    $$.setStatusCar(statusCar)
  };

  $$.beginLiveStream = function () {
    if (rtmp_url && rtmp_channel && socketSource && sc, videoSource) {
      setSession();
    } else {
      console.warn("[Caster] - You are missing some configuration settings. Please rectify this.");
    }
  };
  $$.stopLiveStream  = function () {
    if (stream) {
      stream.stop();
      stream = false;
    } else {
      console.warn("[Caster] - You need to begin the livestream before you can stop it, silly goose");
    }
  };

  /**
   *
   * Below this line contains all the private methods
   * that we don't want the user to be able to access
   *
   */
  function initPhoner() {
    try {
      phoner.init();
      if (browser.isSafariWebRTC()) {
        Phoner.playFirstVideo(localVideo, true);
      }
    } catch (e) {
      setStatus('error');
      throw new Error('[Caster] - cannot initiate phoner. Status degrading.');
    }
  }
  
  function setStatus(changeTo) {
    try {
      status = changeTo;
      sc(changeTo);
    } catch (e) {
      throw new Error('[Caster] - Cannot record status changes. Please check your statusCar function.');
    }
  }

  function setSession() {
    if(socketSource) {
      let tempSession, sessionStatus = constants.SESSION_STATUS;
      if (phoner.getSessions().length) {
        tempSession = phoner.getSessions()[0];
      } else {
        phoner.createSession({ urlServer: socketSource })
          .on(sessionStatus.DISCONNECTED, function() { setStatus(sessionStatus.DISCONNECTED); })
          .on(sessionStatus.FAILED, function() { setStatus(sessionStatus.FAILED); })
          .on(sessionStatus.ESTABLISHED, function (newSession) { setStatus(sessionStatus.ESTABLISHED); session = newSession; setStream(); });
      }
    } else {
      console.warn('[Caster] - Please set the socket source before attempting this.');
    }
  }

  function setStream() {
    if (session && rtmp_url && videoSource && rtmp_url) {
      let settings = {
        name: rtmp_channel,
        display: videoSource,
        rtmpUrl: rtmp_url,
        cacheLocalResources: true,
        receiveVideo: false,
        receiveAudio: false
      }, streamStatus = constants.STREAM_STATUS;
      session.createStream(settings)
        .on(streamStatus.PUBLISHING, function(newStream) { setStatus(streamStatus.PUBLISHING); stream = newStream; })
        .on(streamStatus.FAILED, function() { setStatus(streamStatus.FAILED); })
        .on(streamStatus.UNPUBLISHED, function() { setStatus(streamStatus.UNPUBLISHED); })
        .publish();
    } else {
      console.warn('[Caster] - Please set the settings before attempting this.');
    }
  }
}

module.exports = caster;