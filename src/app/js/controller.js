export default function Controller(model, view) {
  this.model = model;
  this.view = view;
  const self = this;

  // 이벤트 바인드(뷰 - 컨트롤러 동작)
  this.view.bind("addCount", function () {
    self.addCount(); // 굳이 프로토타입에 정의하고 이렇게 가져올 필요가 있나
  });
  this.view.bind("minusCount", function () {
    self.minusCount();
  });
}

Controller.prototype.addCount = function () {
  this.model.count += 1;
  this.view.render(this.model.count);
};

Controller.prototype.minusCount = function () {
  this.model.count--;
  this.view.render(this.model.count);
};
