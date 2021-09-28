import Controller from "./controller.js";
import PhotoModel from "./models/photo.model.js";
import IndexView from "./views/index.view.js";

const IndexController = class extends Controller {
  constructor() {
    super();
    this.model = new PhotoModel();
    this.view = new IndexView(this);
    this.render();
  }

  async render() {
    const data = await this.model.getOnlyPhotos();
    this.view.render(data);
  }
};

new IndexController();
