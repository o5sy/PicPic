import PhotoModel, { PhotoList } from "./photo.model.js";
import { getParam } from "../util/util.js";

const SearchModel = class extends PhotoModel {
  constructor() {
    super();
    this.photo = [];
    this.total;
    this.currentPage = getParam("page", 1);
    this.totalPage;
    this.query = this.getQuery();
  }

  // TODO 개선하고 싶음
  // 프로퍼티는 생성자 함수에서 선언하고
  // 외부에서 이 메소드 호출해서 데이터 대입하게 짰는데
  // 컨트롤러 쪽에서 이 메소드를 호출해야 된다는걸 놓치면
  // 문제가 생길 것임
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
