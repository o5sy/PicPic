import PhotoView from "./photo.view.js";
const IndexView = class extends PhotoView {
  constructor(controller) {
    super(controller);

    // 검색
    this.bindQueryInput(document.getElementById("queryInput"));
  }

  render(model) {
    // 메인 사진
    this.mainPhotoRender(model.shift());

    // 사진 목록
    this.photoListRender(model, document.getElementById("photoList"));
  }

  mainPhotoRender(data) {
    if (!data) return;
    //? id 오타 등으로 엘리먼트를 가져오지 못한 경우 예외처리를 어떻게 하는게 좋을까
    const mainPhotoView = document.getElementById("mainPhotoView");
    const mainPhotoBy = document.getElementById("mainPhotoBy");
    const mainPhotoDetailLink = document.getElementById("mainPhotoDetailLink");
    mainPhotoView?.setAttribute("src", data.src);
    mainPhotoDetailLink?.setAttribute("href", `/photo/${data.id}`);
    if (mainPhotoBy) mainPhotoBy.innerHTML = data.userName;

    // 페이드인 효과
    mainPhotoView?.addEventListener("load", () => {
      mainPhotoView.classList.add("fade-in");
    });
  }
};
export { IndexView as default };
