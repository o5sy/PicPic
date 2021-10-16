import { PhotoList } from "./photo.model.js";
import { getParam } from "../util/util.js";

export default class BookmarkModel {
  #KEY = "bookmark";

  // TODO 프로퍼티랑 메소드 정리가 필요할 듯
  // 객체 지향 프로그래밍에서 상태는 프로퍼티, 동작은 메소드로 짜야됨
  // 현재 북마크 사진 목록이라는 상태!!를
  // 메소드 반환 값으로 가져다 쓰는 형태로 개발함
  // ! 객체 지향 설계를 다시 찾아볼까..
  constructor() {
    this.bookmarkList = [];
    this.currentPage = getParam("page", 1);
  }

  // return: true: 추가됨, false: 제거됨
  toggle(data) {
    if (this.isExist(data.id)) {
      this.remove(data);
      return false;
    } else {
      this.add(data);
      return true;
    }
  }

  // 전체 목록 0번째에 추가
  add(data) {
    if (this.isExist(data.id)) return;
    // 로컬스토리지에 저장하기 전 북마크 상태 변경(체크)
    data.isBookMark = true;
    const list = this.getTotalList();
    list.splice(0, 0, data); // 0번째에 추가
    localStorage.setItem(this.#KEY, JSON.stringify(list));
  }

  // 전체 목록에서 해당 데이터 제거
  remove(data) {
    if (!this.isExist(data.id)) return;
    const list = this.getTotalList();
    const idx = this.getDataIndexById(data.id);
    list.splice(idx, 1); // 원본 객체 변경
    localStorage.setItem(this.#KEY, JSON.stringify(list));
  }

  // 키 자체를 삭제함
  clear() {
    localStorage.removeItem(this.#KEY);
  }

  // 전체 데이터 목록 반환 (가공 x)
  // return: 각 원소가 객체인 배열
  getTotalList() {
    const arr = localStorage.getItem(this.#KEY);
    return JSON.parse(arr) ?? new Array();
  }

  // 페이지에 대한 사진 목록 데이터 반환
  getListPerPage(page = 1, perPage = 30) {
    const totalList = this.getTotalList();
    const totalCount = totalList.length; // 전체 갯수
    const beginIdx = Math.min((page - 1) * perPage, totalCount - 1);
    const endIdx = Math.min(
      page === 1 ? perPage : page * perPage + 1,
      totalCount
    );

    const photoList = totalList.slice(beginIdx, endIdx); // 사진 데이터 목록
    const totalPage = Math.ceil(totalCount / perPage);

    return new PhotoList(photoList, totalCount, totalPage);
  }

  getTotalCount() {
    return this.getTotalList().length;
  }

  // 특정 사진 유무 체크
  // return: 있으면 true, 없으면 false
  isExist(id) {
    return this.getDataIndexById(id) > -1;
  }

  // return: 전체 객체 배열에서 특정 id 값을 가진 데이터의 인덱스
  // 없으면 -1 리턴
  getDataIndexById(id) {
    const list = this.getTotalList();
    return list.findIndex((e) => e.id === id);
  }

  print() {
    console.log(localStorage.getItem(this.#KEY));
  }
}
