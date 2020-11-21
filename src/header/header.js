import html from "./header.html";
import $ from "jquery";
import { renderTemplate } from "../template-utils";
import { getHistory } from "../app-history";
import Modal from "../modal/modal";



const movieContainer = document.querySelector(".container");

const history = getHistory();

class Header {
  constructor() {
    this.header = renderTemplate(html);
  }

  onClick(event) {
    if (event.target.tagName === "A") {
      event.preventDefault();
      history.push({ pathname: "/list", search: "" });
    }
    else if (event.target.id === "add-new") {
      event.preventDefault();

      const modal = new Modal();
      modal.render();
      modal.saveMovie();

      $("#modal").modal("show");
      history.push({ pathname: "/list", search: "" });
      let movieData = JSON.parse(localStorage.getItem("movies"));
      console.log(movieData)
    }
  }

  // onAddMovieClick() {
  //   const modal = new Modal((event) => {
  //     event.preventDefault();
  //     event.stopImmediatePropagation();
  //     const id = uuidv4();
  //     const title = this.header.querySelector("#title").value;
  //     const origin = document.querySelector("#origin_title").value;
  //     const year = document.querySelector("#year").value;
  //     const country = document.querySelector("#country").value;
  //     const tagline = document.querySelector("#tagline").value;
  //     const producer = document.querySelector("#producer").value;
  //     const actors = document.querySelector("#actors").value;//переделать на .split(",")
  //     const rating = document.querySelector("#rating").value;
  //     const description = document.querySelector("#description").value;
  //     const image = document.querySelector("#image");
  //     const additionalPositions = [];

  //     if (document.querySelector("input[name=newPos]") && document.querySelector("input[name=newName]")) {
  //       document.querySelectorAll(".new-fields").forEach(e => {
  //         const newPos = e.querySelector("input[name=newPos").value;
  //         const newName = e.querySelector("input[name=newName").value;
  //         const newMovieCard = {};
  //         newMovieCard[newPos] = newName;
  //         additionalPositions.push(newMovieCard);
  //       });
  //     };
  //     const movieInfo = {
  //       "id": id,
  //       "title": title,
  //       "origin": origin,
  //       "year": year,
  //       "country": country,
  //       "tagline": tagline,
  //       "producer": producer,
  //       "actors": actors,
  //       "rating": rating,
  //       "description": description,
  //       "image": image,
  //       "additionalPositions": additionalPositions
  //     }

  //     const movieData = JSON.parse(localStorage.getItem("movies"));

  //     movieData.push(movieInfo);
  //     console.log(movieData);
  //     localStorage.setItem("movies", JSON.stringify(movieData));
  //     history.push({ pathname: "/list", search: "" });

  //     // $('#modal').modal('hide');
  //   })
  //   modal.render();

  //   $("#modal").modal("show");
  // }

  clickSearch() {
    this.header.querySelector("#search-btn").addEventListener("click", (e) => {
      e.preventDefault();
      const searchQuery = this.header.querySelector("input[name=query]");
      history.push({ pathname: "search-", search: `?query=${searchQuery.value}` });
    })
  }

  
  render() {
    this.header.addEventListener("click", this.onClick.bind(this));

    this.clickSearch();

    return this.header;
  }
}

export default Header;
