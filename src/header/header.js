
import html from "./header.html";
import { renderTemplate } from "../template-utils";
import { getHistory } from "../app-history";

const history = getHistory();
class CreateHeader {
  constructor() {
    this.header = renderTemplate(html);
  }

  onClick(event) {
    if (event.target.tagName === "a") {
      event.preventDefault();
      history.push(event.target.href);
    }
  }

  render() {
    this.header.addEventListener("click", this.onClick.bind(this));
    return this.header;
  }
}

export default CreateHeader;


// class CreateHeader {
//   constructor() {
//     this.header
//   }
  // onClick (event) {
  //   if (event.target.tagName === "a") {
  //     event.preventDefault();
  //     history.push(event.target.href);
  //     console.log(event.target.href)
  //   }
  // }

//   render() {
//     this.header = html;
//     // this.header.addEventListener("click", this.onClick.bind(this));
//     const container = document.createElement("div");
//     container.innerHTML = html;


//     return container.firstChild;

//   }
// }

// export default CreateHeader