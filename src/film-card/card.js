import "jquery";
import $ from "jquery";
import html from "./card.html";
import newFields from "../modal/addFields.html";
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
    this.card = renderTemplate(html, movie)
  }

  onEditClick() {
    const editButton = this.card.querySelector(".btn-edit");
    editButton.addEventListener('click', () => {
      const edit = new Modal(this.card);
      edit.render();

      document.querySelector("#movieId").value = this.id;
      document.querySelector("#title").value = this.title;
      document.querySelector("#origin_title").value = this.origin;
      document.querySelector("#image").value = this.image;
      document.querySelector("#year").value = this.year;
      document.querySelector("#country").value = this.country;
      document.querySelector("#tagline").value = this.tagline;
      document.querySelector("#producer").value = this.producer;
      document.querySelector("#actors").value = this.actors;
      document.querySelector("#rating").value = this.rating;
      document.querySelector("#description").value = this.description;

      const movieData = JSON.parse(localStorage.getItem("movies"));
      const findMovie = movieData.find(movie => movie.id === this.id);

      if (findMovie.additionalPositions.length) {
        for (let i = 0; i < findMovie.additionalPositions.length; i++) {
          const addField = document.createElement("div");
          addField.className = "form-group row new-fields";
          addField.innerHTML = newFields;
          document.querySelector("#add-field").appendChild(addField);
        };
      };

      if (document.querySelector("input[name=newPos]") && document.querySelector("input[name=newName]")) {
        const newPos = findMovie.additionalPositions;

        let keys = [];
        let value = [];
        newPos.forEach(pos => {
          keys.push(Object.keys(pos))
          value.push(Object.values(pos))
        });
        keys = keys.join().split(",");
        value = value.join().split(",");
        document.querySelectorAll('.new-fields').forEach((field, i) => {
          field.querySelector("input[name=newPos]").value = keys[i];
          field.querySelector("input[name=newName]").value = value[i];
        });
      };

      $("#modal").modal("show");
      edit.editMovie();
    })
  }

  onDeleteClick() {
    const deleteButton = this.card.querySelector(".btn-delete");

    deleteButton.addEventListener("click", () => {
      const confirmDelete = confirm("Вы точно хотите удалить фильм?");
      if (confirmDelete === true) {
        this.card.remove();
        let movieData = JSON.parse(localStorage.getItem("movies"));
        const newMovies = movieData.filter(movie => movie.id !== this.id);

        localStorage.setItem("movies", JSON.stringify(newMovies));
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