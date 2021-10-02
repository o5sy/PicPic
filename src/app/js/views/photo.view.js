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
    // ! 요소가 많아질수록 수정하기 어려움
    // ! 어떻게하면 쉽게 짤 수 있을까
    rootElement.append(
      ...dataList.map((data) => {
        const li = document.createElement("li");
        li.classList.add("item");

        // 상세보기 페이지로 이동시키는 앵커
        // const photoLink = document.createElement("a");
        // photoLink.classList.add("item__photo-link");
        // photoLink.setAttribute("href", `/photo/${data.id}`);

        // // 실제 이미지
        // const photoImg = document.createElement("img");
        // photoImg.setAttribute("src", data.src);
        // photoLink.appendChild(photoImg);

        // li.appendChild(photoLink);

        // 이미지
        const photoImg = document.createElement("img");
        photoImg.classList.add("item__photo");
        photoImg.setAttribute("src", data.src);
        li.appendChild(photoImg);

        // 이미지 로드 시 페이드 효과 추가
        photoImg.addEventListener("load", () => {
          photoImg.classList.add("fade-in");
        });

        // 사진 정보
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-container");

        // 사진 정보 - 상위 레이아웃
        const topDiv = document.createElement("div");
        topDiv.classList.add("top");

        // 북마크 버튼
        const bookmarkBtn = document.createElement("button");
        bookmarkBtn.classList.add("bookmark-button");
        bookmarkBtn.innerHTML = `<svg width="160" height="186" viewBox="0 0 160 186" fill="none" xmlns="http://www.w3.org/2000/svg">        <path d="M151.586 20.5651V165.16C151.586 167.703 150.858 170.02 149.4 172.114C147.941 174.21 145.977 175.744 143.511 176.715C142.09 177.313 140.444 177.61 138.574 177.61C134.986 177.61 131.882 176.414 129.264 174.024L79.7935 126.457L30.3229 174.023C27.6299 176.489 24.5279 177.723 21.0118 177.723C19.2921 177.723 17.6462 177.388 16.0769 176.715C13.6095 175.744 11.6458 174.211 10.1877 172.117C8.73002 170.021 8 167.704 8 165.16V20.5635C8 18.0203 8.73003 15.7029 10.1877 13.6087C11.6458 11.5145 13.6095 9.98024 16.0769 9.00898C17.6478 8.33672 19.2921 8 21.0118 8H138.574V8.00157C140.295 8.00157 141.941 8.33829 143.511 9.01055C145.977 9.9826 147.942 11.5149 149.401 13.6103C150.857 15.7045 151.587 18.0218 151.586 20.5651V20.5651Z" stroke="white" stroke-width="15" stroke-miterlimit="10"/>        </svg>`;
        if (data.isBookMark) bookmarkBtn.classList.add("check");

        // 북마크 클릭 이벤트 추가
        bookmarkBtn.addEventListener("click", (event) => {
          this.controller.toggleBookmark(data.id, (isOn) => {
            if (isOn) bookmarkBtn.classList.add("check");
            else bookmarkBtn.classList.remove("check");
          });
          event.stopPropagation();
        });

        topDiv.appendChild(bookmarkBtn);
        infoDiv.appendChild(topDiv);

        // 사진 정보 - 하위 레이아웃
        const bottomDiv = document.createElement("div");
        bottomDiv.classList.add("bottom");
        bottomDiv.innerHTML = `<div class="user-info">
        				  <img src="${data.userProfile}" />
        				  <div class="user-name">${data.userName}</div>
        				</div>`;

        // 다운 버튼 추가
        const downloadButton = document.createElement("button");
        downloadButton.classList.add("download-button");
        bottomDiv.appendChild(downloadButton);
        infoDiv.appendChild(bottomDiv);

        // 정보 엘리먼트 클릭 이벤트 추가(상세 페이지로 이동)
        infoDiv.addEventListener("click", () => {
          this.controller.showDetail(data.id);
        });

        li.appendChild(infoDiv);

        // 다운 버튼 클릭
        downloadButton.addEventListener("click", (event) => {
          this.controller.photoDownload(data);
          event.stopPropagation();
        });

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
