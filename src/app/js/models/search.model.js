import PhotoModel, { PhotoList } from "./photo.model.js";
import { getParam } from "../util/util.page.js";
const SearchModel = class extends PhotoModel {
  constructor() {
    super();
    this.photo = [];
    this.total;
    this.currentPage = getParam("page", 1);
    this.totalPage;
    this.query = this.getQuery();
  }

  setPhotoData(data) {
    this.photo = data.photo;
    this.total = data.total;
    this.totalPage = data.totalPage;
  }

  // url에서 검색어 추출 및 반환
  getQuery() {
    const urlSplit = location.pathname.split("/");
    let query = urlSplit?.length > 2 ? decodeURI(urlSplit[2]) : "";
    return query;
  }
};
export { SearchModel as default };
