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
    const data = await this.model.getPhoto(this.model.photoId).catch(() => {
      // TODO not found ui 표시
      console.log("해당 아이템을 가져오는데 실패했습니다.");
    });
    this.view.render(data);

    // 다운로드 영역
    this.view.downloadRender(this.downloadModel.categoryList);
  }
};
new DetailController();
