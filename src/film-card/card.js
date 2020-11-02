import "jquery";
import html from "./card.html";
import template from "lodash.template";
import { getHistory } from "../app-history";
import EditMovie from "../edit-movie/edit";

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
  }

  render() {
    const t = templateRenderer({
      id: this.id,
      image: this.image,
      title: this.title,
      description: this.description,
      rating: this.rating,
      origin: this.origin
    })

    const main = document.querySelector("main");

    const container = document.createElement("div");
    container.innerHTML = t;

    main.appendChild(container.firstChild);

    const editButtons = document.querySelectorAll(".btn-edit");
    const deleteButtons = document.querySelectorAll(".btn-delete");
    const moreInfoLinks = document.querySelectorAll(".more");
    const filmCards = document.querySelectorAll(".card");
    const movieContainer = document.querySelector(".container");
    const edit = new EditMovie();

    editButtons.forEach(button => {
      if (!button.dataset.clicked) {
        button.addEventListener('click', (event) => {
          console.log(event.target.value)
          movieContainer.appendChild(edit.render());
          const title = document.querySelector("#title");
          const origin = document.querySelector("#origin_title");
          title.value = this.title;
          origin.value = this.origin;

        })
        button.dataset.clicked = true;
      }
    })
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

    moreInfoLinks.forEach(button => {
      if (!button.dataset.clicked) {
        button.addEventListener("click", (event) => {
          console.log("More info");
          event.preventDefault();

          history.push(event.target.href);
          console.log(event.target.href);
        })
        button.dataset.clicked = true;
      }
    })
  }
}

export default RenderCard