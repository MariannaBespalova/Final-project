import html from "./main.html"


class CreateMain {
  constructor() {
    this.main
  }
  render() {
    this.main = html;

    const container = document.createElement("div");
    container.innerHTML = html;

    document.body.firstElementChild.appendChild(container.firstChild);
  }
}

export default CreateMain