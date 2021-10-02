import View from "./view.js";
import { isEmpty } from "../util/util.page.js";

const PhotoView = class extends View {
  constructor() {
    super();
  }

  photoListRender(dataList, rootElement) {
    if (!dataList || !dataList.length) {
      // TODO 데이터 없음 가이드 ui 표시
      console.log("Not found photo list data.");
      return;
    }
    if (!rootElement) {
      throw "Not set root element.";
    }

    // 더미 요소 제거
    rootElement.innerHTML = "";
    rootElement.append(
      ...dataList.map((data) => {
        const li = document.createElement("li");
        li.classList.add("item");

        // 상세보기 페이지로 이동시키는 앵커
        const photoLink = document.createElement("a");
        photoLink.classList.add("item__photo-link");
        photoLink.setAttribute("href", `/photo/${data.id}`);

        // 실제 이미지
        const photoImg = document.createElement("img");
        photoImg.setAttribute("src", data.src);
        photoLink.appendChild(photoImg);

        li.appendChild(photoLink);

        // 이미지 로드 시 페이드 효과 추가
        photoImg.addEventListener("load", () => {
          photoImg.classList.add("fade-in");
        });

        // 업로드 사용자 정보
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-container");
        infoDiv.innerHTML = `<div class="user-info">
        				  <img src="${data.userProfile}" />
        				  <div class="user-name">${data.userName}</div>
        				</div>`;

        // 다운 버튼 추가
        const downloadButton = document.createElement("button");
        downloadButton.classList.add("download-button");
        infoDiv.appendChild(downloadButton);

        li.appendChild(infoDiv);

        // 다운 버튼 클릭
        downloadButton.addEventListener("click", () =>
          this.controller.photoDownload(data)
        );

        // 마우스 호버 시 추가 정보 표시
        li.addEventListener("mouseover", () => {
          infoDiv.classList.add("hover");
        });
        li.addEventListener("mouseleave", () => {
          if (!infoDiv.classList.contains("hover")) return;
          infoDiv.classList.remove("hover");
        });
        return li;
      })
    );
  }

  // 더미 요소 추가
  // ? 이렇게 추가하고 데이터 받아왔을 때
  // ? 부모 엘리먼트 비우고 다시 추가하는거 말고
  // ? 재활용하거나 처리를 좀 더 줄일 수 있는 방법 없을까
  setPhotoListSkeleton(rootElement) {
    if (!rootElement) {
      throw "Not set root element.";
    }

    for (let i = 0; i < 30; i++) {
      const li = document.createElement("li");
      li.classList.add("item");
      rootElement.appendChild(li);
    }
    rootElement.style.height = "unset"; // css에 정의한 초기값 설정 해제
  }

  // TODO 검색 뷰 파일 생성해서 분리해야 될 거 같은데 어떻게 구현하지
  // 검색창 엔터 입력 시 검색 페이지로 이동
  bindQueryInput(inputElement) {
    if (!inputElement) throw "Not set input element.";

    inputElement.addEventListener("keydown", (event) => {
      const query = inputElement.value;
      if (isEmpty(query)) return;

      if (event.key === "Enter") {
        this.controller.search(query);
      }
    });
  }
};

export { PhotoView as default };
