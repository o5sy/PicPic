// import Controller from "./controller.js";
// import Model from "./models/model.js";
// import View from "./view.js";

// function App() {
//   this.model = new Model();
//   this.view = new View();
//   this.controller = new Controller(this.model, this.view);
// }
// new App();

// 이미지 불러오기 테스트
import PhotoModel from "./models/photo.model";
import { getParam, isEmpty } from "./util/util.page";

// url param 체크
const urlSplit = location.pathname.split("/");
let query = urlSplit?.length > 2 ? decodeURI(urlSplit[2]) : "";

// 페이지 이동 버튼 별로 링크 넣어주기
// 1페이지 이미지 목록 가져오기
// 잘 가져왔으면 뿌리기
// 페이지 체크해서 숨기거나 비활성화 하기

const photoListView = document.getElementById("photoList");
const resultView = document.getElementById("resultView");
const currentPageLabel = document.getElementById("currentPageLabel");
const lastPageLabel = document.getElementById("lastPageLabel");
const nextPageButton = document.getElementById("nextPageButton");
const prevArrowButton = document.getElementById("prevArrowButton");
const nextArrowButton = document.getElementById("nextArrowButton");
const paginationContainer = document.getElementById("paginationContainer");
const emptyGuide = document.getElementById("emptyGuide");
const totalCountLabels = document.querySelectorAll("#totalCount");

// 현재 페이지 설정
let totalPage;
let currentPage = getParam("page", 1);
currentPageLabel.value = currentPage;

// 페이지 이동 버튼 url 설정
const prevPage = Math.max(currentPage - 1, 1);
const path = !isEmpty(query) ? `/search/${query}` : "/search";
prevArrowButton.setAttribute("href", `${path}?page=${prevPage}`);
const nextPage = currentPage + 1;
nextArrowButton.setAttribute("href", `${path}?page=${nextPage}`);
nextPageButton.href = `${path}?page=${nextPage}`;

// 사진 목록
const photoModel = new PhotoModel();
photoModel.getPhotoList(query, currentPage).then((res) => {
  if (!res) return;
  if (!res.results || res.total === 0) {
    // 사진 목록 숨기기
    if (resultView) resultView.style.display = "none";
    // 페이지네이션 숨기기
    if (paginationContainer) paginationContainer.style.display = "none";
    // 가이드 보이기
    if (emptyGuide) emptyGuide.style.display = "block";
    return;
  }

  // 사진 목록 추가
  res.results.map((info) => {
    const { id, urls } = info;

    // 엘리먼트 생성
    const li = document.createElement("li"),
      link = document.createElement("a"),
      img = document.createElement("img");

    // 클래스 추가
    li.classList.add("item");
    link.classList.add("item__photo-link");

    // 데이터 추가
    link.href = `/photo/${id}`;
    img.src = urls.thumb;

    // 노드 연결
    li.appendChild(link);
    link.appendChild(img);

    photoListView.appendChild(li);
  });

  // 총 갯수 넣기
  [...totalCountLabels].map(
    // 천 단위 콤마 표시
    (e) => (e.innerHTML = res.total.toLocaleString("ko-KR"))
  );

  // 페이지 번호 넣기
  lastPageLabel.innerHTML = totalPage = res.total_pages;

  // 페이지 이동 링크 수정
  const nextPage = Math.min(currentPage + 1, totalPage);
  const path = !isEmpty(query) ? `/search/${query}` : "/search";
  nextArrowButton.setAttribute("href", `${path}?page=${nextPage}`);
  nextPageButton.href = `${path}?page=${nextPage}`;

  // 페이지 이동 ui 제한 추가
  if (currentPage === 1) {
    prevArrowButton.removeAttribute("href");
  } else if (currentPage == totalPage) {
    nextPageButton.style.display = "none";
    nextArrowButton.removeAttribute("href");
  }
});

// 검색창 입력 이벤트
// 포커스 -> 엔터
// 해당 검색어 파라미터로 담아서
// 검색 페이지로 이동
// 검색 결과 없을 경우 가이드 출력
// 검색 결과 있을 경우 메인 페이지 레이아웃 대로 출력
const queryInput = document.getElementById("queryInput");
queryInput?.addEventListener("keydown", (event) => {
  const query = queryInput.value;
  if (event.key === "Enter") {
    location.assign(`${query}`);
  }
});

// 검색어 있을 경우 검색창에 대입
if (!isEmpty(query)) {
  queryInput.value = query;
}

// 쪽수 입력 이벤트
// 엔터 시 page 파라미터에 input 값 넣어서 요청
currentPageLabel?.addEventListener("keydown", (event) => {
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
