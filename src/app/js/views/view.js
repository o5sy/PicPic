const View = class {
  constructor(controller) {
    if (!controller) throw "No received controller";
    this.controller = controller;
  }
};

export { View as default };
