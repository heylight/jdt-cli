// import emptyParams from '@/views/Main/Service/Arrange/Design/emptyParams.json';

export function goLogin(url) {
  if (!window.location.href.includes("returnUrl")) {
    // const returnUrl = window.location.href.replace('/#', '');
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `${url}${returnUrl}`;
  }
}
/**
 * 深拷贝
 * @param {any} obj
 */
export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
/**
 * 添加水印
 * @param {string} str
 */
export function addWaterMarker(str) {
  const can = document.createElement("canvas");
  const cover = document.createElement("div");
  document.body.appendChild(cover);
  cover.style.position = "fixed";
  cover.style.height = "100vh";
  cover.style.width = "100vw";
  cover.style.zIndex = "99999";
  cover.style.top = "0";
  cover.style.left = "0";
  cover.style.pointerEvents = "none";
  cover.appendChild(can);
  can.width = 150;
  can.height = 150;
  can.style.display = "none";
  const cans = can.getContext("2d");
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = "12px Microsoft JhengHei";
  cans.fillStyle = "rgba(17, 17, 17, 0.9)";
  cans.textAlign = "left";
  cans.textBaseline = "Middle";
  cans.fillText(str, can.width / 3 - 40, can.height / 2, 200);
  cover.style.backgroundImage = `url(${can.toDataURL("image/png")})`;
}

/**
 * @param {func} function 需要节流的函数
 * @param {delay} number 等待时间
 */
export function throttle(fn, delay) {
  var previous = 0;
  return function() {
    var _this = this;
    var args = arguments;
    var now = new Date();
    if (now - previous > delay) {
      fn.apply(_this, args);
      previous = now;
    }
  };
}

/**
 * @param {func} function 需要防抖的函数
 * @param {delay} number 等待时间
 */
export function debounce(fn, delay) {
  var timer;
  return function() {
    var _this = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      fn.apply(_this, args);
    }, delay);
  };
}

/**
 * 数据格式转换
 * @param {Object} params
 */
// export function paramsToForm(params) {
//   if (params === undefined || params === null || !Object.keys(params).length) {
//     return emptyParams;
//   }
//   const {
//     HTTP_METHOD,
//     HTTP_PORT,
//     HTTP_PATH,
//     HTTP_HOST,
//     HEADER,
//     QUERY,
//     RESPONSE,
//     BODY,
//     SUCCESS_CONDITION,
//   } = emptyParams.API;
//   params.API.HTTP = params.API.HTTP || [HTTP_METHOD, HTTP_PORT, HTTP_PATH, HTTP_HOST];
//   params.API.HEADER = params.API.HEADER || HEADER;
//   params.API.QUERY = params.API.QUERY || QUERY;
//   params.API.RESPONSE = params.API.RESPONSE || RESPONSE;
//   params.API.BODY = params.API.BODY || BODY;
//   params.API.SUCCESS_CONDITION = params.API.SUCCESS_CONDITION || SUCCESS_CONDITION;
//   return {
//     API: {
//       HTTP_METHOD: params.API.HTTP.find((x) => x.attrName === 'HTTP_METHOD') || HTTP_METHOD,
//       HTTP_PORT: params.API.HTTP.find((x) => x.attrName === 'HTTP_PORT') || HTTP_PORT,
//       HTTP_PATH: params.API.HTTP.find((x) => x.attrName === 'HTTP_PATH') || HTTP_PATH,
//       HTTP_HOST: params.API.HTTP.find((x) => x.attrName === 'HTTP_HOST') || HTTP_HOST,
//       HEADER:
//         Array.isArray(params.API.HEADER) && params.API.HEADER.length
//           ? params.API.HEADER
//           : [{ attrLocation: 'HEADER', attrName: '', attrValue: '' }],
//       QUERY:
//         Array.isArray(params.API.QUERY) && params.API.QUERY.length
//           ? params.API.QUERY
//           : [{ attrLocation: 'QUERY', attrName: '', attrValue: '' }],
//       RESPONSE:
//         Array.isArray(params.API.RESPONSE) && params.API.RESPONSE.length
//           ? params.API.RESPONSE
//           : [{ attrLocation: 'RESPONSE', attrName: '', attrValue: '' }],
//       BODY:
//         Array.isArray(params.API.BODY) && params.API.BODY
//           ? params.API.BODY[0]
//           : { attrLocation: 'BODY', attrName: 'BODY', attrValue: '' },
//       SUCCESS_CONDITION:
//         Array.isArray(params.API.SUCCESS_CONDITION) && params.API.SUCCESS_CONDITION
//           ? params.API.SUCCESS_CONDITION
//           : [{ attrLocation: 'SUCCESS_CONDITION', attrName: '', attrValue: '' }],
//     },
//     DOCKER: params.DOCKER.DOCKER,
//     SCRIPT: params.SCRIPT.SCRIPT,
//     STRATEGY: params.STRATEGY.STRATEGY,
//   };
// }
