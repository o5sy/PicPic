import { createApi } from "unsplash-js";
import { isEmpty } from "../util/util.page";

export default class PhotoModel {
  #unsplashApi;

  constructor() {
    // api 설정
    // demo 버전은 시간당 최대 50회까지 요청 가능
    this.#unsplashApi = createApi({
      accessKey: "JHLSSHZ9m54JJ3dEqddNnHPsUSUZpHN-zNze4LNb6iY",
    });
  }

  async getPhotoList(query, page = 1, perPage = 30) {
    let res;
    if (isEmpty(query)) {
      // 전체 목록 조회
      res = await this.#unsplashApi.photos.list({
        page: page,
        perPage: perPage,
      });
    } else {
      // 검색어로 목록 조회
      res = await this.#unsplashApi.search.getPhotos({
        query: query,
        page: page,
        perPage: perPage,
      });
    }

    if (res.errors) {
      console.log("error occurred: ", res.errors[0]);
    } else {
      console.log(res);
      // 전체 페이지 수 프로퍼티 추가
      res.response.total_pages = res.response.total_pages
        ? res.response.total_pages
        : Math.max(1, Math.ceil(res.response.total / perPage));
      // console.log(res.response);
      // console.log(res.response.total, perPage, res.response.totalPage);
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
