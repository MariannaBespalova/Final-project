import html from "./modal.html";
import newField from "./addFields.html";
import { renderTemplate } from "../template-utils";
import $ from "jquery";
import { v4 as uuidv4 } from 'uuid';
import { getHistory } from "../app-history";

const history = getHistory();

class Modal {
  constructor(movie) {

    if (movie === null || movie === undefined) {
      this.form = renderTemplate(html);
    }
    this.form = renderTemplate(html, { movie });
  }

  onAddFieldClick() {
    this.addField = this.form.querySelector("#add-field");
    this.addField.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      if (event.target.closest(".btn-add-field")) {
        this.newField = document.createElement("div");
        this.newField.className = "form-group row new-fields";
        this.newField.innerHTML = newField;
        this.addField.appendChild(this.newField);
      } else if (event.target.closest(".btn-remove-field")) {
        event.target.closest(".new-fields").remove();
      }
    })
  }

  editMovie() {
    const saveBtn = this.form.querySelector(".save");
    saveBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.id = this.form.querySelector("#movieId").value
      this.title = this.form.querySelector("#title").value;
      this.origin = this.form.querySelector("#origin_title").value;
      this.year = this.form.querySelector("#year").value;
      this.country = this.form.querySelector("#country").value;
      this.tagline = this.form.querySelector("#tagline").value;
      this.producer = this.form.querySelector("#producer").value;
      this.actors = this.form.querySelector("#actors").value.split(",");
      this.rating = this.form.querySelector("#rating").value;
      this.description = this.form.querySelector("#description").value;
      this.image = this.form.querySelector("#image").value;
      this.additionalPositions = [];
      this.like = 0;
      this.dislike = 0;



      if (this.form.querySelector("input[name=newPos]") && this.form.querySelector("input[name=newName]")) {
        this.form.querySelectorAll(".new-fields").forEach(field => {
          const newPos = field.querySelector("input[name=newPos").value;
          const newName = field.querySelector("input[name=newName").value;
          const newMovieCard = {};
          newMovieCard[newPos] = newName;
          this.additionalPositions.push(newMovieCard);
        })
      }

      const movieInfo = {
        id: this.id,
        title: this.title,
        origin: this.origin,
        year: this.year,
        country: this.country,
        tagline: this.tagline,
        producer: this.producer,
        actors: this.actors,
        rating: this.rating,
        description: this.description,
        image: this.image,
        additionalPositions: this.additionalPositions,
        like: this.like,
        dislike: this.dislike
      }

      const movieData = JSON.parse(localStorage.getItem("movies"));
      const findMovie = movieData.find(movie => movie.id === this.id);
      const index = movieData.indexOf(findMovie);

      movieData[index] = movieInfo;

      localStorage.setItem("movies", JSON.stringify(movieData));

      this.editMovieCardInfo(this.id);

      $('#modal').modal('hide');
    })
  }

  saveMovie() {
    const saveBtn = this.form.querySelector(".save");
    saveBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.id = uuidv4();
      this.title = this.form.querySelector("#title").value;
      this.origin = this.form.querySelector("#origin_title").value;
      this.year = this.form.querySelector("#year").value;
      this.country = this.form.querySelector("#country").value;
      this.tagline = this.form.querySelector("#tagline").value;
      this.producer = this.form.querySelector("#producer").value;
      this.actors = this.form.querySelector("#actors").value.split(", ");
      this.rating = this.form.querySelector("#rating").value;
      this.description = this.form.querySelector("#description").value;
      this.image = this.form.querySelector("#image").value;
      this.additionalPositions = [];
      this.like = 0;
      this.dislike = 0;

      if (this.form.querySelector("input[name=newPos]") && this.form.querySelector("input[name=newName]")) {
        this.form.querySelectorAll(".new-fields").forEach(field => {
          const newPos = field.querySelector("input[name=newPos").value;
          const newName = field.querySelector("input[name=newName").value;
          const newMovieCard = {};
          newMovieCard[newPos] = newName;
          this.additionalPositions.push(newMovieCard);
        })
      }
      const movieInfo = {
        id: this.id,
        title: this.title,
        origin: this.origin,
        year: this.year,
        country: this.country,
        tagline: this.tagline,
        producer: this.producer,
        actors: this.actors,
        rating: this.rating,
        description: this.description,
        image: this.image,
        additionalPositions: this.additionalPositions,
        like: this.like,
        dislike: this.dislike
      }

      const movieData = JSON.parse(localStorage.getItem("movies"));
      movieData.push(movieInfo);
      localStorage.setItem("movies", JSON.stringify(movieData));


      $('#modal').modal('hide');

      history.push({ pathname: "/list", search: "" });
    })
  }

  editMovieCardInfo(id) {

    const movieData = JSON.parse(localStorage.getItem("movies"));
    const findMovie = movieData.find(movie => movie.id === id);

    document.querySelector(`div[data-id=m${id}] .card-title`).innerHTML = findMovie.title;
    document.querySelector(`div[data-id=m${id}] .card-img`).innerHTML = findMovie.image;
    document.querySelector(`div[data-id=m${id}] p[data-id=description]`).innerHTML = findMovie.description;
    document.querySelector(`div[data-id=m${id}] p[data-id=rating]`).innerHTML = findMovie.rating;
  }

  render() {
    document.body.appendChild(this.form);
    this.onAddFieldClick();

    $("#modal").on("hidden.bs.modal", () => {
      $("#modal").remove();
    })
  }
}

export default Modal;