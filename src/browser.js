module.exports = {
  isIE() {
    return /*@cc_on!@*/false || !!document.documentMode;
  },
  isFirefox() {
    return typeof InstallTrigger !== 'undefined';
  },
  isChrome() {
    return !!window.chrome && !!window.chrome.webstore;
  },
  isEdge() {
    return !isIE && !!window.StyleMedia;
  },
  isOpera() {
    return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  },
  isiOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  },
  isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  },
  isAndroid() {
    return navigator.userAgent.toLowerCase().indexOf("android") > -1;
  },
  isSafariWebRTC() {
    return navigator.mediaDevices && Browser.isSafari();
  }
};