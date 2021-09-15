import Controller from "./controller.js";
import Model from "./models/model.js";
import View from "./view.js";

function App() {
  this.model = new Model();
  this.view = new View();
  this.controller = new Controller(this.model, this.view);
}
new App();
