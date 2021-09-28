import { getParam } from "./util/util.page.js";
const downloadjs = require("./lib/download.js");

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  // 검색 페이지로 이동
  search(query) {
    const path = location.origin + `/search/${query}`;
    location.assign(path);
  }

  // 이미지 다운로드
  photoDownload(photo) {
    // 이미지 url
    const downloadUrl = photo.src;

    // 이미지 명
    let extension = getParam("fm", "jpg", downloadUrl);
    let fileName = photo.id + "-regular." + extension;

    // 다운로드
    var x = new XMLHttpRequest();
    x.open("GET", downloadUrl, true);
    x.responseType = "blob";
    x.onload = function (e) {
      downloadjs(x.response, fileName, `image/${extension}`);
    };
    x.send();

    // 다운로드 추적
    this.model.trackDownloadPhoto(photo.downloadLocation);
  }
}
