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
      console.log("not found data");
      return;
    }

    // 사진
    this.setPhoto(model.src);

    // 사진 정보
    this.setPhotoInfo(
      model.userName,
      model.userProfile,
      model.createdDate,
      model.downloadCount
    );

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
        const template = DownloadCategoryItem();

        // 카테고리명 대입
        template.innerHTML = template.innerHTML.replace(
          "{category-name}",
          cat.categoryName
        );

        // 아이템 추가
        // !!무조건 innerHTML 대입 후에 해야함 (새로 생성된 노드로 교체됨)
        const itemListWrap = template.querySelector(".item-list");
        itemListWrap.append(
          ...cat.downloadItems.map((item) => {
            // 템플릿 생성
            let itemTemplate = DownloadItem();

            // 제목, 해상도 대입 (문자열 교체)
            itemTemplate.innerHTML = itemTemplate.innerHTML
              .replace("{item-name}", item.itemName)
              .replace("{width}", item.resolution.width)
              .replace("{height}", item.resolution.height);

            // 다운로드 버튼 이벤트 추가
            const downloadBtn = itemTemplate.querySelector(
              ".item__download-button"
            );
            downloadBtn.addEventListener("click", () => {
              // * 해당 해상도로 다운로드
              // 필요한 데이터: 이미지 id, 해상도
              // 이미지 id -> 모델에 있음 -> 컨트롤러가 참조함
              // 해상도를 인자로 담아서 컨트롤러로 넘김
              this.controller.downloadImage(item.resolution);
            });

            return itemTemplate;
          })
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
      photoView.style.height = "unset";

      // 페이드인 효과
      photoView.classList.add("fade-in");
    });
  }

  setPhotoInfo(name, profileImg, createdDate, downloadCount) {
    const userNameLabel = document.getElementById("userNameLabel");
    if (userNameLabel) userNameLabel.innerHTML = name;

    const userProfileImg = document.getElementById("userProfileImg");
    userProfileImg?.setAttribute("src", profileImg);

    const dateDiv = document.getElementById("createdDate");
    if (dateDiv) dateDiv.innerHTML = createdDate;

    // 다운로드 트랙해도 수가 늘지 않아서 숨김
    // const downloadCountSpan = document.getElementById("downloadCount");
    // if (downloadCountSpan) downloadCountSpan.innerHTML = downloadCount;
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
