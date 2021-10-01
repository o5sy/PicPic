import PhotoView from "./photo.view.js";
import { isEmpty } from "../util/util.page.js";
const SearchView = class extends PhotoView {
  constructor(controller) {
    super();
    this.controller = controller;
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
    this.setTotalCount(model.total);

    // 사진 목록
    this.photoListRender(model.photo, document.getElementById("photoList"));

    // 페이지
    this.setPage(model.currentPage, model.totalPage, model.query);
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

  /**
   * 사진 조회 결과 갯수 렌더
   * @param {number} totalCount
   */
  setTotalCount(totalCount) {
    const totalCountLabels = document.querySelectorAll("#totalCount");
    // 천 단위 콤마 표시
    [...totalCountLabels].map((e) => {
      e.innerHTML = totalCount.toLocaleString("ko-KR");
      e.style.width = "unset"; // 기본 너비값 설정 해제
    });
  }

  setPage(currentPage, totalPage, query) {
    // 현재 페이지 설정
    const currentPageLabel = document.getElementById("currentPageLabel");
    currentPageLabel.value = currentPage;

    // 총 페이지 수 설정
    const lastPageLabel = document.getElementById("lastPageLabel");
    lastPageLabel.innerHTML = totalPage;

    // 페이지 이동 버튼 href 설정 (화살표 버튼)
    const prevArrowButton = document.getElementById("prevArrowButton");
    const nextArrowButton = document.getElementById("nextArrowButton");
    const nextPageButton = document.getElementById("nextPageButton");
    const prevPage = Math.max(currentPage - 1, 1);
    const nextPage = Math.min(currentPage + 1, totalPage);
    const path = !isEmpty(query) ? `/search/${query}` : "/search";
    prevArrowButton.setAttribute("href", `${path}?page=${prevPage}`);
    nextArrowButton.setAttribute("href", `${path}?page=${nextPage}`);
    nextPageButton.href = `${path}?page=${nextPage}`;

    // 페이지 이동 버튼 제한
    if (currentPage === 1) {
      // 첫 페이지일 경우 이전 페이지 이동 버튼 비활성화
      prevArrowButton.removeAttribute("href");
    } else if (currentPage == totalPage) {
      // 마지막 페이지일 경우 다음 페이지 이동 버튼 비활성화, 숨김
      nextPageButton.style.display = "none";
      nextArrowButton.removeAttribute("href");
    }

    // 페이지 수 입력 이벤트
    currentPageLabel?.addEventListener("keydown", (event) => {
      // 엔터 시 page 파라미터에 input 값 넣어서 요청
      if (event.key === "Enter") {
        const pageValue = currentPageLabel.value;
        if (
          typeof pageValue !== "number" &&
          pageValue > 0 &&
          pageValue <= totalPage
        ) {
          location.assign(`?page=${currentPageLabel.value}`);
        } else {
          alert(`1에서 ${totalPage}까지의 페이지를 입력해 주세요.`);
        }
      }
    });
  }
};
export { SearchView as default };
