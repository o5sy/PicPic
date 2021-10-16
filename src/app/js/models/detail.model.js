import PhotoModel from "./photo.model.js";
const DetailModel = class extends PhotoModel {
  #photo;

  constructor() {
    super();
  }

  // 가져온 사진 데이터 재사용하기 위한 함수
  async getPhotoData() {
    return this.#photo
      ? this.#photo
      : (this.#photo = await this.getPhoto(this.getPhotoId()));
  }

  // url에서 사진 id 추출 및 반환
  getPhotoId() {
    const urlSplit = location.pathname.split("/");
    const photoId = urlSplit[2];
    return photoId;
  }
};
export { DetailModel as default };
