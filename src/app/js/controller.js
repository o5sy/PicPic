import BookMarkModel from "./models/bookmark.model.js";
import { getParam } from "./util/util.page.js";
const downloadjs = require("./lib/download.js");

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.bookmarkModel = new BookMarkModel();
  }

  // 검색 페이지로 이동
  search(query) {
    const path = location.origin + `/search/${query}`;
    location.assign(path);
  }

  // 상세 페이지로 이동
  showDetail(photoId) {
    const path = location.origin + `/photo/${photoId}`;
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

  // 북마크 추가 / 삭제
  toggleBookmark(data, renderCallback) {
    const isOn = this.bookmarkModel.toggle(data);

    // 해당 아이템 렌더
    renderCallback(isOn);
  }
}
