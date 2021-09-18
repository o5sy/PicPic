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

const unsplash = createApi({
  accessKey: "JHLSSHZ9m54JJ3dEqddNnHPsUSUZpHN-zNze4LNb6iY",
});

async function getPhotos() {
  const res = await unsplash.photos.list({ page: 1, perPage: 15 });
  if (res.errors) {
    console.log("error occurred: ", res.errors[0]);
  } else {
    console.log(res);
    console.log(res.response);
    console.log(res.response.results);
    return res.response.results;
  }
}

const view = document.getElementById("photoList");

// const photoList = getPhotos();
// photoList.then((items) => {
//   // 데이터 파싱
//   // 엘리먼트 동적 생성
//   // 부모에 추가
//   items.map((info) => {
//     const { id, urls, created_at, updated_at } = info;

//     // 엘리먼트 생성
//     const li = document.createElement("li"),
//       link = document.createElement("a"),
//       img = document.createElement("img");

//     // 클래스 추가
//     li.classList.add("item");
//     link.classList.add("item__photo-link");

//     // 데이터 추가
//     link.href = `/detail/${id}`;
//     img.src = urls.thumb;

//     // 노드 연결
//     li.appendChild(link);
//     link.appendChild(img);

//     view.appendChild(li);
//   });
// });

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
