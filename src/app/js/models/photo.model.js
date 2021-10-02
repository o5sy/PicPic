import BookMarkModel from "./bookmark.model.js";
import { createApi } from "unsplash-js";
import { isEmpty } from "../util/util.page.js";

export class PhotoList {
  constructor(photo = [], total = 1, totalPage = 1) {
    this.photo = photo;
    this.total = total;
    this.totalPage = totalPage;
  }
}

class Photo {
  constructor(
    id,
    src,
    isBookMark = false,
    userName = "user",
    userProfile = "/res/img/icon/profile-image.svg",
    downloadLocation = "",
    tags = []
  ) {
    this.id = id;
    this.src = src;
    this.isBookMark = isBookMark;
    this.userName = userName;
    this.userProfile = userProfile;
    this.downloadLocation = downloadLocation;
    this.tags = tags;
  }
}

export default class PhotoModel {
  #API;

  constructor() {
    // api 설정
    // demo 버전은 시간당 최대 50회까지 요청 가능
    this.#API = createApi({
      accessKey: "JHLSSHZ9m54JJ3dEqddNnHPsUSUZpHN-zNze4LNb6iY",
    });
    this.BookMarkModel = new BookMarkModel();
  }

  // 사진 목록 반환
  async getPhotoList(query = "", page = 1, perPage = 30) {
    let res;
    if (isEmpty(query)) {
      // 전체 목록 조회
      res = await this.#API.photos.list({
        page: page,
        perPage: perPage,
      });
    } else {
      // 검색어로 목록 조회
      res = await this.#API.search.getPhotos({
        query: query,
        page: page,
        perPage: perPage,
      });
    }

    if (!res) throw "응답 없음";
    if (res.status !== 200) throw res.errors;

    let { results, total = 1, total_pages } = res.response;
    if (!results) throw "사진 데이터 없음";
    total_pages = total_pages ?? Math.max(1, Math.ceil(total / perPage));

    return new PhotoList(
      results.map((data) => {
        const { id, user, urls, links } = data;
        const isBookMark = this.BookMarkModel.isExist(id);
        const userName = user.username ?? user.name;
        const userProfile =
          user.profile_image.small ??
          user.profile_image.medium ??
          user.profile_image.large;
        const src =
          urls.regular ?? urls.small ?? urls.raw ?? urls.full ?? urls.thumb;
        const downloadLocation = links?.download_location;
        return new Photo(
          id,
          src,
          isBookMark,
          userName,
          userProfile,
          downloadLocation
        );
      }),
      total,
      total_pages
    );
  }

  // PhotoList의 photo만 리턴
  async getOnlyPhotos(count = 26) {
    count = Math.min(count, 30); // 1회 당 최대 30개 요청 가능
    const list = await this.getPhotoList("", 1, count);
    return list.photo;
  }

  async getPhoto(id) {
    if (isEmpty(id)) throw "id가 없습니다.";

    const res = await this.#API.photos.get({
      photoId: id,
    });
    if (!res) throw "응답 없음";
    if (res.status !== 200) throw res.errors;

    const { id: resId, tags, user, urls, links } = res.response;
    const src =
      urls.regular ?? urls.small ?? urls.raw ?? urls.full ?? urls.thumb;
    const isBookMark = this.BookMarkModel.isExist(id);
    const userName = user.username ?? user.name;
    const userProfile =
      user.profile_image.small ??
      user.profile_image.medium ??
      user.profile_image.large;
    const downloadLocation = links?.download_location;
    const tagList = tags.map((tag) => tag.title);
    return new Photo(
      resId,
      src,
      isBookMark,
      userName,
      userProfile,
      downloadLocation,
      tagList
    );
  }

  async trackDownloadPhoto(downloadLocation) {
    this.#API.photos.trackDownload({
      downloadLocation: downloadLocation,
    });
  }
}
