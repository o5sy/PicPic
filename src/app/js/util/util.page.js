// url에서 파라미터 값 파싱 후 반환
export const getParam = (param, initValue, url = null) => {
  const location = isEmpty(url) ? window.location : new URL(url);
  const queryString = location.search; // ex) ?product=shirt
  const urlParams = new URLSearchParams(queryString);
  if (typeof initValue === "number") {
    return urlParams.get(param) ? parseInt(urlParams.get(param)) : initValue;
  }
  return urlParams.get(param) ? urlParams.get(param) : initValue;
};

function isEmpty(str) {
  if (typeof str == "undefined" || str == null || str == "") return true;
  else return false;
}
