import PhotoView from "./photo.view.js";
import { DownloadCategoryItem, DownloadItem } from "./items/download.item.js";

const DetailView = class extends PhotoView {
  constructor(controller) {
    super(controller);

    // 검색
    this.bindQueryInput(document.getElementById("queryInput"));
  }

  render(model) {
    if (!model) {
      // TODO not found ui 표시
      return;
    }

    // TODO 주석 풀어야함(다운로드 개발하고나서)
    // 사진
    // this.setPhoto(model.src);

    // 유저 정보
    this.setUserInfo(model.userName, model.userProfile);

    // 태그 목록
    this.setTagList(model.tags);

    // 다운로드 버튼 이벤트
    const downloadButton = document.getElementById("downloadButton");
    downloadButton?.addEventListener("click", () =>
      this.controller.photoDownload(model)
    );
  }

  downloadRender(model) {
    // 루트 엘리먼트
    const root = document.getElementById("downloadRoot");
    if (!root) throw "Not exist root element.";

    //! 아이템 추가
    // 모델 데이터 순회 -> 루트 요소에 추가
    //  ㄴ 카테고리 생성 (각각 처리 -> ul 리턴 리턴)
    //      ㄴ 아이템 생성 (각각 처리 -> 문자열 리턴 -> 카테고리에 대입(교체))
    root.appendChild(
      model.reduce((ul, cat) => {
        // 템플릿 생성
        const template = new DownloadCategoryItem();

        // 카테고리명 대입
        template.innerHTML = template.innerHTML.replace(
          "{category-name}",
          cat.categoryName
        );

        // 아이템 대입(순회)
        template.innerHTML = template.innerHTML.replace(
          "{item-list}",
          cat.downloadItems.reduce((list, item) => {
            // 템플릿 생성
            let itemTemplate = new DownloadItem();

            // 제목 대입
            itemTemplate.innerHTML = itemTemplate.innerHTML.replace(
              "{item-name}",
              item.itemName
            );

            // 해상도 텍스트 대입
            itemTemplate.innerHTML = itemTemplate.innerHTML.replace(
              "{width}",
              item.resolution.width
            );
            itemTemplate.innerHTML = itemTemplate.innerHTML.replace(
              "{height}",
              item.resolution.height
            );

            // TODO 다운로드 버튼 연결

            list += itemTemplate.outerHTML;
            return list;
          }, "")
        );

        // 노드 연결
        ul.appendChild(template);
        return ul;
      }, document.createElement("ul"))
    );
  }

  setPhoto(src) {
    const photoView = document.getElementById("photoView");
    photoView?.setAttribute("src", src);
    photoView.addEventListener("load", () => {
      // 기본값 설정 해제
      // TODO 주석 풀어야함(다운로드 개발하고나서)
      // photoView.style.height = "unset";

      // 페이드인 효과
      photoView.classList.add("fade-in");
    });
  }

  setUserInfo(name, profileImg) {
    const userNameLabel = document.getElementById("userNameLabel");
    const userProfileImg = document.getElementById("userProfileImg");
    if (userNameLabel) userNameLabel.innerHTML = name;
    userProfileImg?.setAttribute("src", profileImg);
  }

  setTagList(tags) {
    // 태그 목록 뿌리기
    const tagList = document.getElementById("tagList");
    tagList?.append(
      ...tags.map((tag) => {
        const li = document.createElement("li");
        li.classList.add("tag");
        li.innerHTML = `<a href="/search/${tag}">${tag}</a>`;
        return li;
      })
    );
  }
};
export { DetailView as default };
