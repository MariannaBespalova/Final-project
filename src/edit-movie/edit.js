import html from "./edit.html";
import $ from "jquery"
import { renderTemplate } from "../template-utils";


class EditMovie {
  constructor() {
    this.edit = renderTemplate(html);
  }

  render() {
    $("#modal").modal("show")
    return this.edit;
  }
}

export default EditMovie;