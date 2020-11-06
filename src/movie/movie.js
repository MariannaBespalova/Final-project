import html from "./movie.html";
import { renderTemplate } from "../template-utils";


class CreateMovie {
  constructor(movie) {
    this.filmDetails = renderTemplate(html, { movie })
  }

  render() {
    return this.filmDetails;
  }
}

export default CreateMovie;
