import Controller from "./controller.js";
import SearchView from "./views/search.view.js";
import SearchModel from "./models/search.model.js";

const SearchController = class extends Controller {
  constructor() {
    super();
    this.model = new SearchModel();
    this.view = new SearchView(this);
    this.render();
  }

  async render() {
    // 검색창 초기화
    this.view.initQueryInput(this.model.query);

    // 데이터 통신 후 렌더
    const data = await this.model.getPhotoList(
      this.model.query,
      this.model.currentPage
    );
    this.model.setPhotoData(data);
    this.view.render(this.model);
  }
};

new SearchController();
