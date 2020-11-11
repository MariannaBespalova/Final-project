import html from "./movie.html";
import { renderTemplate } from "../template-utils";


class CreateMovie {
  constructor(movie) {
    this.details = renderTemplate(html, { ...movie })
  }

  render() {
    return this.details;
  }
}

export default CreateMovie;
