import html from "./movie.html";
import { renderTemplate } from "../template-utils";


class Movie {
  constructor(movie) {
    this.id = movie.id;
    this.like = movie.like;
    this.dislike = movie.dislike;
    this.details = renderTemplate(html, movie);
  }

  changeRating() {
    const movieData = JSON.parse(localStorage.getItem("movies"));

    this.details.querySelector(".rating").addEventListener("click", (event) => {
      if (event.target.closest("button[data-id=thumbUp]")) {
        this.like++;
        const findMovie = movieData.find(movie => movie.id === this.id);
        findMovie.like = this.like;
        event.target.closest("button[data-id=thumbUp]").dataset.count++;
      };
      if (event.target.closest("button[data-id=thumbDown]")) {
        this.dislike++;
        const findMovie = movieData.find(movie => movie.id === this.id);
        findMovie.dislike = this.dislike;
        event.target.closest("button[data-id=thumbDown]").dataset.count++;
      };
      localStorage.setItem("movies", JSON.stringify(movieData));
    });
  }

  render() {
    this.changeRating();
    return this.details;
  }
}

export default Movie;
