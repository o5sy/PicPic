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

    rootElement.append(
      ...dataList.map((data) => {
        const li = document.createElement("li");
        li.classList.add("item");
        li.innerHTML = `<a class="item__photo-link" href="/photo/${data.id}">
							  <img src="${data.src}" />
							</a>`;

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
