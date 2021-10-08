import PhotoView from "./photo.view.js";

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

  setPhoto(src) {
    const photoView = document.getElementById("photoView");
    photoView?.setAttribute("src", src);
    photoView.addEventListener("load", () => {
      // 기본값 설정 해제
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
