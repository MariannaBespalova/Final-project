import html from "./main.html"


class CreateMain {
  constructor() {
    this.main
  }
  render() {
    this.main = html;

    const container = document.createElement("div");
    container.innerHTML = html;

    return container.firstChild;
  }
}

export default CreateMain