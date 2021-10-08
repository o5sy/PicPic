import Controller from "./controller.js";
import BookmarkModel from "./models/bookmark.model.js";
import SearchView from "./views/search.view.js";

const BookmarkController = class extends Controller {
  constructor() {
    super();
    this.model = new BookmarkModel();
    this.view = new SearchView(this);
    this.render();
  }

  async render() {
    // 검색창 초기화
    this.view.initQueryInput(this.model.query);

    // 데이터 바인딩
    const data = await this.model.getListPerPage(this.model.currentPage);
    // TODO 개선하고 싶음
    // currentPage 데이터 필요해서 껴넣음
    // model 클래스에서 모든 예외처리 후 render()에 인자 전달한다는 가정하에
    // render() 내에 속성 유무 체크 등의 예외 처리를 하지 않았는데
    // 이렇게 하나 둘 임의로 껴넣으면 처음 의도와 달라져서 관리가 안될듯
    this.view.render({ ...data, currentPage: this.model.currentPage });
  }
};
new BookmarkController();
