import html from "./card.html"
import template from "lodash.template";

const templateRenderer = template(html);

class RenderCard {
  constructor(props) {
    this.id = props.id || "",
      this.image = props.image || "";
    this.title = props.title || "";
    this.description = props.description || "";
    this.rating = props.rating || "";
  }
  render() {
    const t = templateRenderer({
      id: this.id,
      image: this.image,
      title: this.title,
      description: this.description,
      rating: this.rating
    })

    const main = document.querySelector("main");

    const container = document.createElement("div");
    container.innerHTML = t;

    main.appendChild(container.firstChild);

    const editButtons = document.querySelectorAll(".btn-edit");
    const deleteButtons = document.querySelectorAll(".btn-delete");
    const moreInfoLinks = document.querySelectorAll(".more");
    const filmId = document.querySelectorAll(".card")

    editButtons.forEach(button => {
      if (!button.dataset.clicked) {
        button.addEventListener('click', () => {
          console.log("Edit button");

        })
        button.dataset.clicked = true;
      }
    })

    deleteButtons.forEach((button, index) => {
      if (!button.dataset.clicked) {
        button.addEventListener("click", (event) => {
        let confirmDelete = confirm("Вы точно хотите удалить фильм?");
        if (confirmDelete === true)
          filmId[index].innerHTML ="";
          console.log(event)
        })
        button.dataset.clicked = "true";
      }
    })

    moreInfoLinks.forEach(button => {
      if (!button.dataset.clicked) {
        button.addEventListener("click", () => {
          console.log("More info")
        })
        button.dataset.clicked = true;
      }
    })

  }
}

export default RenderCard