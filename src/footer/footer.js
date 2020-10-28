import html from "./footer.html"


class CreateFooter {
  constructor() {
    this.footer
  }
  render() {
    this.footer = html;

    const container = document.createElement("div");
    container.innerHTML = html;

    document.body.firstElementChild.appendChild(container.firstChild);
  }
}

export default CreateFooter