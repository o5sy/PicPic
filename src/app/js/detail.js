import Controller from "./controller.js";
import DetailModel from "./models/detail.model.js";
import DetailView from "./views/detail.view.js";

const DetailController = class extends Controller {
  constructor() {
    super();
    this.model = new DetailModel();
    this.view = new DetailView(this);
    this.render();
  }

  async render() {
    const data = await this.model.getPhoto(this.model.photoId).catch((_) => {
      // TODO not found ui 표시
    });
    this.view.render(data);
  }
};
new DetailController();
