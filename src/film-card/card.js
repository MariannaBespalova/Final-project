import "jquery";
import $ from "jquery";
import html from "./card.html";
import template from "lodash.template";
import { getHistory } from "../app-history";
import EditMovie from "../modal/modal";
import CreateMovie from "../movie/movie"

const history = getHistory();
const templateRenderer = template(html);

class RenderCard {
  constructor(props) {
    this.id = props.id || "";
    this.image = props.image || "";
    this.title = props.title || "";
    this.description = props.description || "";
    this.rating = props.rating || "";
    this.origin = props.origin || "";
    this.year = props.year || "";
    this.country = props.country || "";
    this.tagline = props.tagline || "";
    this.producer = props.producer || "";
    this.actors = props.actors || "";
  }

  onEditClick() {
    const editButtons = document.querySelectorAll(".btn-edit");
    const edit = new EditMovie();
    const movieContainer = document.querySelector(".container");
    editButtons.forEach(button => {
      if (!button.dataset.clicked) {
        button.addEventListener('click', () => {
          edit.render();
          $("#modal").modal("show");
          const title = document.querySelector("#title");
          const origin = document.querySelector("#origin_title");
          const year = document.querySelector("#year");
          const country = document.querySelector("#country");
          const tagline = document.querySelector("#tagline");
          const producer = document.querySelector("#producer");
          const actors = document.querySelector("#actors");
          const rating = document.querySelector("#rating");
          const description = document.querySelector("#description");
          title.value = this.title;
          origin.value = this.origin;
          year.value = this.year;
          country.value = this.country;
          tagline.value = this.tagline;
          producer.value = this.producer;
          actors.value = this.actors;
          rating.value = this.rating;
          description.value = this.description;
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

          const detailedMovie = new CreateMovie();
          movieContainer.firstElementChild.appendChild(detailedMovie.render());


          history.push(event.target.href);
          console.log(event.target.href);
        })
        button.dataset.clicked = true;
      }
    })
  }

  render() {
    const t = templateRenderer({
      id: this.id,
      image: this.image,
      title: this.title,
      description: this.description,
      rating: this.rating,
      origin: this.origin,
      year: this.year,
      country: this.country,
      tagline: this.tagline,
      producer: this.producer,
      actors: this.actors
    })

    const main = document.querySelector("main");

    const container = document.createElement("div");
    container.innerHTML = t;

    main.appendChild(container.firstChild);

    this.onEditClick();
    this.onDeleteClick();
    this.onMoreInfoClick();

  }
}

export default RenderCard