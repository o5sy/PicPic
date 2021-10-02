export default class BookMarkModel {
  #KEY = "bookmark";

  constructor() {
    this.bookmarkList = [];
  }

  // return: true: 추가됨, false: 제거됨
  toggle(id) {
    if (this.isExist(id)) {
      this.remove(id);
      return false;
    } else {
      this.add(id);
      return true;
    }
  }

  add(id) {
    if (this.isExist(id)) return;
    const list = this.getList();
    list.push(id);
    localStorage.setItem(this.#KEY, JSON.stringify(list));
  }

  remove(id) {
    if (!this.isExist(id)) return;
    const list = this.getList();
    const idx = list.indexOf(id);
    list.splice(idx, 1);
    localStorage.setItem(this.#KEY, JSON.stringify(list));
  }

  clear() {
    localStorage.removeItem(this.#KEY);
  }

  // return array
  getList() {
    const data = localStorage.getItem(this.#KEY);
    return JSON.parse(data) ?? new Array();
  }

  isExist(id) {
    const list = this.getList();
    return list.includes(id);
  }

  print() {
    console.log(localStorage);
  }
}
