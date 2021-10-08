import PhotoView from "./photo.view.js";
import { isEmpty } from "../util/util.page.js";
const SearchView = class extends PhotoView {
  constructor(controller) {
    super(controller);
  }

  // 검색창 초기화
  initQueryInput(query) {
    const queryInput = document.getElementById("queryInput");
    if (!isEmpty(query)) {
      if (queryInput) queryInput.value = query;
    }
    // 검색 이벤트 바인딩
    this.bindQueryInput(queryInput);
  }

  render(model) {
    if (!model.photo || model.total === 0) {
      // 조회된 사진이 0개일 경우
      this.setEmptyGuide();
      return;
    }

    // 전체 사진 수
    this.setTotalCount(model.total, document.querySelectorAll("#totalCount"));

    // 사진 목록
    this.photoListRender(model.photo, document.getElementById("photoList"));

    // 페이지
    this.setPage(model.currentPage, model.totalPage, model?.query);
  }

  setEmptyGuide() {
    const resultView = document.getElementById("resultView");
    const paginationContainer = document.getElementById("paginationContainer");
    const emptyGuide = document.getElementById("emptyGuide");

    // 사진 목록 숨기기
    if (resultView) resultView.style.display = "none";
    // 페이지네이션 숨기기
    if (paginationContainer) paginationContainer.style.display = "none";
    // 가이드 보이기
    if (emptyGuide) emptyGuide.style.display = "block";
  }
};
export { SearchView as default };
