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
import { createApi } from "unsplash-js";

class PhotoModel {
  #unsplashApi;

  constructor() {
    // api 설정
    // demo 버전은 시간당 최대 50회까지 요청 가능
    this.#unsplashApi = createApi({
      accessKey: "JHLSSHZ9m54JJ3dEqddNnHPsUSUZpHN-zNze4LNb6iY",
    });
  }

  async getData(page = 1, perPage = 30) {
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
}

// 페이지 이동 버튼 별로 링크 넣어주기
// 1페이지 이미지 목록 가져오기
// 잘 가져왔으면 뿌리기
// 페이지 체크해서 숨기거나 비활성화 하기

const photoListView = document.getElementById("photoList");
const currentPageLabel = document.getElementById("currentPageLabel");
const lastPageLabel = document.getElementById("lastPageLabel");
const nextPageButton = document.getElementById("nextPageButton");
const prevArrowButton = document.getElementById("prevArrowButton");
const nextArrowButton = document.getElementById("nextArrowButton");

// 현재 페이지 설정
const queryString = window.location.search; // ex) ?product=shirt
const urlParams = new URLSearchParams(queryString);
let totalPage;
let currentPage = urlParams.get("page") ? parseInt(urlParams.get("page")) : 1;
currentPageLabel.value = currentPage;

// 페이지 이동 버튼 url 설정
const prevPage = Math.max(currentPage - 1, 1);
prevArrowButton.setAttribute("href", `/?page=${prevPage}`);
const nextPage = currentPage + 1;
nextArrowButton.setAttribute("href", `/?page=${nextPage}`);
nextPageButton.href = `/?page=${nextPage}`;

// 사진 목록
const photoModel = new PhotoModel();
photoModel.getData(currentPage).then((res) => {
  if (!res) return;

  // 사진 목록 추가
  res.results.map((info) => {
    const { id, urls, created_at, updated_at } = info;

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

  // 페이지 번호 넣기
  lastPageLabel.innerHTML = totalPage = res.totalPage;

  // 페이지 이동 링크 수정
  const nextPage = Math.min(currentPage + 1, totalPage);
  nextArrowButton.setAttribute("href", `/?page=${nextPage}`);
  nextPageButton.href = `/?page=${nextPage}`;

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
    location.assign(`search/${query}`);
  }
});

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
