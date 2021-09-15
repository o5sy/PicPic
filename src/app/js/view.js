export default function View() {
  this.$countLabel = document.getElementById("countLabel");
  this.$addButton = document.getElementById("addButton");
  this.$minusButton = document.getElementById("minusButton");
}

View.prototype.bind = function (event, handler) {
  switch (event) {
    case "addCount":
      this.$addButton?.addEventListener("click", () => {
        handler();
      });
      break;
    case "minusCount":
      this.$minusButton?.addEventListener("click", () => {
        handler();
      });
      break;
  }
};

View.prototype.render = function (count) {
  this.$countLabel.innerHTML = count;
};
