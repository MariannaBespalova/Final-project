import html from "./movie.html";
import { renderTemplate } from "../template-utils";


class CreateMovie {
  constructor(movie) {
    this.title = movie.title || "";
    this.movie = renderTemplate(html, {
      title: this.title
    })
  }

  render() {
    return this.movie;
  }
}

export default CreateMovie;
