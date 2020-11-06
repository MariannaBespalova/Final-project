import html from "./header.html";
import $ from "jquery";
import { renderTemplate } from "../template-utils";
import { getHistory } from "../app-history";
import EditMovie from "../modal/modal";
const edit = new EditMovie();
const movieContainer = document.querySelector(".container");

const history = getHistory();
class CreateHeader {
  constructor() {
    this.header = renderTemplate(html);
  }

  onClick(event) {
    if (event.target.tagName === "a") {
      event.preventDefault();
      history.push(event.target.href);
    } else if (event.target.id === "add-new") {
      event.preventDefault();
      edit.render();
      $("#modal").modal("show");
    }
  }

  render() {
    this.header.addEventListener("click", this.onClick.bind(this));
    return this.header;
  }
}

export default CreateHeader;
