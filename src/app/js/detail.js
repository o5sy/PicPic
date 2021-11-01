import Controller from "./controller.js";
import DetailModel from "./models/detail.model.js";
import DownloadModel from "./models/download.model.js";
import DetailView from "./views/detail.view.js";

const DetailController = class extends Controller {
  constructor() {
    super();
    this.model = new DetailModel();
    this.view = new DetailView(this);
    this.downloadModel = new DownloadModel();
    this.render();
  }

  async render() {
    const data = await this.model.getPhotoData();
    this.view.render(data);

    // 다운로드 영역
    this.view.downloadRender(this.downloadModel.categoryList);
  }

  async downloadImage(resolution) {
    // 다운로드 이미지 url 생성
    const photo = await this.model.getPhotoData();
    const downloadUrl =
      photo.rawUrl + `&w=${resolution.width}&h=${resolution.height}`;

    // 다운로드
    this.photoDownload(photo, downloadUrl);
  }
};
new DetailController();
