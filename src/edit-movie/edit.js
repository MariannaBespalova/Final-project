import html from "./edit.html";

import { renderTemplate } from "../template-utils";


class EditMovie {
  constructor() {
    this.edit = renderTemplate(html);
  }

  render() {
  
    return this.edit;
  }
}

export default EditMovie;