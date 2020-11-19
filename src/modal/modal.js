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
    
  }

  saveMovie() {
    const footer = document.querySelector(".modal-footer");
    footer.addEventListener("click", (event) => {
      if (event.target.closest(".save")) {
        event.stopImmediatePropagation();
        this.id = uuidv4();
        this.title = this.form.querySelector("#title").value || "";
        this.origin = this.form.querySelector("#origin_title").value || "";
        this.year = this.form.querySelector("#year").value;
        this.country = this.form.querySelector("#country").value;
        this.tagline = this.form.querySelector("#tagline").value;
        this.producer = this.form.querySelector("#producer").value;
        this.actors = this.form.querySelector("#actors").value;//переделать на .split(",")
        this.rating = this.form.querySelector("#rating").value;
        this.description = this.form.querySelector("#description").value;
        this.image = this.form.querySelector("#image");
        this.additionalPositions = [];

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
          additionalPositions: this.additionalPositions
        }


        const movieData = JSON.parse(localStorage.getItem("movies"));
        movieData.push(movieInfo);
        localStorage.setItem("movies", JSON.stringify(movieData));
        history.push({ pathname: "/list", search: "" });


        $('#modal').modal('hide');
      }
    })
  }


  render() {
    document.body.appendChild(this.form);
    this.onAddFieldClick();
    this.saveMovie();

    $("#modal").on("hidden.bs.modal", () => {
      $("#modal").remove();
    })
  }
}

export default Modal;