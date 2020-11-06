import "jquery";
import $ from "jquery";
import html from "./card.html";
import { renderTemplate } from "../template-utils";
import { getHistory } from "../app-history";
import EditMovie from "../modal/modal";
import CreateMovie from "../movie/movie"

const history = getHistory();

class RenderCard {
  constructor(movie) {
    this.id = movie.id || "";
    this.image = movie.image || "";
    this.title = movie.title || "";
    this.description = movie.description || "";
    this.rating = movie.rating || "";
    this.origin = movie.origin || "";
    this.year = movie.year || "";
    this.country = movie.country || "";
    this.tagline = movie.tagline || "";
    this.producer = movie.producer || "";
    this.actors = movie.actors || "";
    this.movie = renderTemplate(html, {
      id: this.id,
      image: this.image,
      title: this.title,
      text: this.text,
      description: this.description,
      rating: this.rating,
      origin: this.origin,
      year: this.year,
      country: this.country,
      tagline: this.tagline,
      producer: this.producer,
      actors: this.actors
    })
  }

  onEditClick() {
    const editButtons = document.querySelectorAll(".btn-edit");
    const edit = new EditMovie(this.movie);
    const movieContainer = document.querySelector(".container");
    editButtons.forEach(button => {
      if (!button.dataset.clicked) {
        button.addEventListener('click', () => {
          edit.render();
          $("#modal").modal("show");
          document.querySelector("#title").value = this.title;
          document.querySelector("#origin_title").value = this.origin;
          document.querySelector("#year").value = this.year;
          document.querySelector("#country").value = this.country;
          document.querySelector("#tagline").value = this.tagline;
          document.querySelector("#producer").value = this.producer;
          document.querySelector("#actors").value = this.actors;
          document.querySelector("#rating").value = this.rating;
          document.querySelector("#description").value = this.description;
        })
        button.dataset.clicked = true;
      }
    })
  }

  onDeleteClick() {
    const deleteButtons = document.querySelectorAll(".btn-delete");
    const filmCards = document.querySelectorAll(".card");
    deleteButtons.forEach((button, index) => {
      if (!button.dataset.clicked) {
        button.addEventListener("click", (event) => {
          let confirmDelete = confirm("Вы точно хотите удалить фильм?");
          if (confirmDelete === true)
            filmCards[index].innerHTML = "";
        })
        button.dataset.clicked = "true";
      }
    })
  }

  onMoreInfoClick() {
    const movieContainer = document.querySelector(".container");
    const moreInfoLinks = document.querySelectorAll(".more");
    moreInfoLinks.forEach(button => {
      if (!button.dataset.clicked) {
        button.addEventListener("click", (event) => {
          event.preventDefault();

     
          const detailedMovie =  new CreateMovie(this.movie);
          movieContainer.firstElementChild.appendChild(detailedMovie.render());


          history.push(event.target.href);
          console.log(event.target.href);
        })
        button.dataset.clicked = true;
      }
    })
  }

  render() {
    const main = document.querySelector("main");
    main.appendChild(this.movie);

    this.onEditClick();
    this.onDeleteClick();
    this.onMoreInfoClick();

  }
}

export default RenderCard