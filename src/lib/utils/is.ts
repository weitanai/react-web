/**
 * 所有【是否】类的工具函数，比如是否开发环境
 */

/**
 * 判断浏览器tab是否激活状态
 * From: https://greensock.com/forums/topic/9059-cross-browser-to-detect-tab-or-window-is-active-so-animations-stay-in-sync-using-html5-visibility-api/
 *
 * eg
 * isBrowserActive(function(){
 *   if(isBrowserActive()){
 *     console.log("tab has focus");
 *   } else {
 *     console.log("tab has blur");
 *   }
 * });
 */
export const isBrowserActive = (function () {
  let stateKey: string;
  let eventKey: string;
  const keys = {
    hidden: 'visibilitychange',
    webkitHidden: 'webkitvisibilitychange',
    mozHidden: 'mozvisibilitychange',
    msHidden: 'msvisibilitychange',
  };
  for (stateKey in keys) {
    if (stateKey in document) {
      // @ts-ignore
      eventKey = keys[stateKey];
      break;
    }
  }
  return function (c?: () => void) {
    if (c) {
      document.addEventListener(eventKey, c);
      return eventKey;
    }

    // @ts-ignore
    return !document[stateKey];
  };
})();

/**
 * 判断是否chrome浏览器
 * From https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome/13348618#13348618
 */
export const isChrome = () => {
  // @ts-ignore
  const isChromium = window.chrome;
  const winNav = window.navigator;
  const vendorName = winNav.vendor;
  // @ts-ignore
  const isOpera = typeof window.opr !== 'undefined';
  const isIEedge = winNav.userAgent.indexOf('Edge') > -1;
  const isIOSChrome = winNav.userAgent.match('CriOS');

  if (
    isIOSChrome ||
    (isChromium !== null &&
      typeof isChromium !== 'undefined' &&
      vendorName === 'Google Inc.' &&
      isOpera === false &&
      isIEedge === false)
  ) {
    return true;
  }

  return false;
};
