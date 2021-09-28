import PhotoModel from "./photo.model.js";
const DetailModel = class extends PhotoModel {
  constructor() {
    super();
    this.photoId = this.getPhotoId();
  }

  // url에서 사진 id 추출 및 반환
  getPhotoId() {
    const urlSplit = location.pathname.split("/");
    const photoId = urlSplit[2];
    return photoId;
  }
};
export { DetailModel as default };
