import html from "./footer.html";


class Footer {
  constructor() {
    this.footer;
  }

  render() {
    this.footer = html;

    const container = document.createElement("div");
    container.innerHTML = html;

    return container.firstChild;
  }
}

export default Footer;