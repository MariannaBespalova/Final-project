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
    this.card = renderTemplate(html, movie)

  }

  onEditClick() {
    const editButton = this.card.querySelector(".btn-edit");
    editButton.addEventListener('click', () => {
      const edit = new Modal(this.card);
  
      const movieData = JSON.parse(localStorage.getItem("movies"));
      // const findMovie = movieData.find(movie => movie.id === this.id);
      // const index = movieData.indexOf(findMovie);
      
      edit.render();

      document.querySelector("#movieId").value = this.id;
      document.querySelector("#title").value = this.title;
      document.querySelector("#origin_title").value = this.origin;
      document.querySelector("#upload-poster").value = this.image;
      document.querySelector("#year").value = this.year;
      document.querySelector("#country").value = this.country;
      document.querySelector("#tagline").value = this.tagline;
      document.querySelector("#producer").value = this.producer;
      document.querySelector("#actors").value = this.actors;
      document.querySelector("#rating").value = this.rating;
      document.querySelector("#description").value = this.description;
      $("#modal").modal("show");
      edit.createEditMovie();
      console.log(edit.createEditMovie())
      //   if (findMovie.additionalPositions.length) {
      //     for (let i = 0; i < obj.additionalPositions.length; i++) {
      //         let addField = document.createElement("div");
      //         addField.className = "form-group row addNewFields";
      //         addField.innerHTML = `<div class="col-sm-5">
      //                                 <input required type="text" class="form-control" placeholder="Должность" name="newPos">
      //                             </div>
      //                             <div class="col-sm-5">
      //                                 <input required type="text" class="form-control" placeholder="Имя" name="newName">
      //                             </div>
      //                             <div class="col-sm-2">
      //                                 <button class="btn btn-danger btn-sm btn-remove-field" type="button"><svg class="octicon octicon-x" viewBox="0 0 14 18" version="1.1" width="14" height="18" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg></button>
      //                             </div>`;
      //         document.querySelector("#addField").appendChild(addField);
      //     };
      // };



      const title = document.querySelector("#title").value;
      const origin = document.querySelector("#origin_title").value;

      console.log(title, origin)
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