import { createApi } from "unsplash-js";

export default class PhotoModel {
  #unsplashApi;

  constructor() {
    // api 설정
    // demo 버전은 시간당 최대 50회까지 요청 가능
    this.#unsplashApi = createApi({
      accessKey: "JHLSSHZ9m54JJ3dEqddNnHPsUSUZpHN-zNze4LNb6iY",
    });
  }

  async getPhotoList(page = 1, perPage = 30) {
    const res = await this.#unsplashApi.photos.list({
      page: page,
      perPage: perPage,
    });
    if (res.errors) {
      console.log("error occurred: ", res.errors[0]);
    } else {
      console.log(res);
      console.log(res.response);
      // TODO 여기서 잘못된 데이터 없는지 체크 필요할 듯
      // 전체 페이지 수 프로퍼티 추가
      res.response.totalPage = Math.ceil(res.response.total / perPage);
      console.log(res.response.total, perPage, res.response.totalPage);
      return res.response;
    }
  }

  async getPhoto(id) {
    const res = await this.#unsplashApi.photos.get({
      photoId: id,
    });
    if (res.errors) {
      console.log("error occurred: ", res.errors[0]);
    } else {
      return res.response;
    }
  }

  async trackDownloadPhoto(downloadLocation) {
    this.#unsplashApi.photos.trackDownload({
      downloadLocation: downloadLocation,
    });
  }
}
