import View from "./view.js";
import { isEmpty } from "../util/util.js";

const PhotoView = class extends View {
  constructor(controller) {
    super(controller);
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

    // 옵저버 생성
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        // 옵저버의 루트(뷰포트가 기본값)와 대상 요소가 교차했는지 여부
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    // 더미 요소 제거
    rootElement.innerHTML = "";
    // TODO 개선하고 싶음
    // 요소가 많아질수록 수정하기 어려움
    // 어떻게하면 쉽게 짤 수 있을까
    // TODO 1. 함수로 나누기(한 함수에 한 동작만)
    // 2. 웹 컴포넌트? 템플릿?
    rootElement.append(
      ...dataList.map((data) => {
        const li = document.createElement("li");
        li.classList.add("item");

        // 이미지
        const photoImg = document.createElement("img");
        photoImg.classList.add("item__photo");
        photoImg.dataset.src = data.src; // 수정함!!
        li.appendChild(photoImg);

        // 옵저버 부착(lazy loading)
        observer.observe(photoImg);

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
          this.controller.toggleBookmark(data, (isOn) => {
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
        const userInfoDiv = document.createElement("div");
        userInfoDiv.classList.add("user-info");
        const profileImg = document.createElement("img");
        profileImg.dataset.src = data.userProfile;
        const userNameDiv = document.createElement("div");
        userNameDiv.classList.add("user-name");
        userNameDiv.innerHTML = data.userName;
        userInfoDiv.appendChild(profileImg);
        userInfoDiv.appendChild(userNameDiv);
        bottomDiv.appendChild(userInfoDiv);

        // 옵저버 부착(lazy loading)
        observer.observe(profileImg);

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
    rootElement.style.height = "unset"; // css에 정의한 초기값 설정 해제
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

  /**
   * 사진 조회 결과 갯수 렌더
   * @param {number} totalCount
   */
  setTotalCount(totalCount, rootElementList) {
    // 천 단위 콤마 표시
    [...rootElementList].map((e) => {
      e.innerHTML = totalCount.toLocaleString("ko-KR");
      e.style.width = "unset"; // 기본 너비값 설정 해제
    });
  }

  // TODO 하드 코딩으로 노드 탐색하지 않도록 개선
  setPage(currentPage, totalPage, query = "") {
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
    // const path = !isEmpty(query)
    //   ? `${location.pathname}/${query}`
    //   : location.pathname;
    prevArrowButton.setAttribute("href", `?page=${prevPage}`);
    nextArrowButton.setAttribute("href", `?page=${nextPage}`);
    nextPageButton.href = `?page=${nextPage}`;

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

export { PhotoView as default };
