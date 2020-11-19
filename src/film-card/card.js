import "jquery";
import $ from "jquery";
import html from "./card.html";
import { renderTemplate } from "../template-utils";
import { getHistory } from "../app-history";
import Modal from "../modal/modal";


const history = getHistory();

class Card {
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
    this.card = renderTemplate(html, { ...movie })
  }

  onEditClick() {
    const editButton = this.card.querySelector(".btn-edit");
    const edit = new Modal(this.card);
    const movieContainer = this.card.querySelector(".container");
    editButton.addEventListener('click', () => {
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
  }

  onDeleteClick() {
    const deleteButton = this.card.querySelector(".btn-delete");

    deleteButton.addEventListener("click", () => {
      const confirmDelete = confirm("Вы точно хотите удалить фильм?");
      if (confirmDelete === true) {
        this.card.remove();
        let movieData = JSON.parse(localStorage.getItem("movies"));
        const newMov = movieData.filter(movie => movie.id !== this.id);
        console.log(newMov)

        localStorage.setItem("movies", JSON.stringify(newMov));
      }


    })
  }

  onMoreInfoClick() {
    const moreInfoLink = this.card.querySelector(".more");
    moreInfoLink.addEventListener("click", (event) => {
      event.preventDefault();

      history.push({ pathname: `/list-${this.id}`, search: "" })
    })
  }


  render() {
    const main = document.querySelector("main");
    main.appendChild(this.card);

    this.onEditClick();
    this.onDeleteClick();
    this.onMoreInfoClick();

  }
}

export default Card;