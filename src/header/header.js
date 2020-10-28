import html from "./header.html"


class CreateHeader {
  constructor() {
    this.header
  }
  render() {
    this.header = html

    const container = document.createElement("div");
    container.innerHTML = html;

    document.body.firstElementChild.appendChild(container.firstChild)



  }
}

export default CreateHeader