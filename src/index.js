import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { getHistory } from "./app-history";
import movies from "./movies.json";

import CreateHeader from "./header/header";
import CreateMain from "./main/main";
import RenderCard from "./film-card/card";
import CreateFooter from "./footer/footer";
import Greeting from "./greeting/greeting";

import CreateMovie from "./movie/movie";

console.log(movies[0].id);
const container = document.querySelector(".container");

const header = new CreateHeader();
container.appendChild(header.render());

const main = new CreateMain();
container.appendChild(main.render());

const mainWrapper = document.querySelector("#content");
const greeting = new Greeting();
mainWrapper.appendChild(greeting.render())

const footer = new CreateFooter();
container.appendChild(footer.render());

const history = getHistory();

function renderRoute(path) {
  // if (path === "/") {
  //   mainWrapper.innerHTML = "";
  //   mainWrapper.appendChild(greeting.render());
  // } else if (path === "/list") {
  //   mainWrapper.innerHTML = "";
  //   const movie = movies.map(movie => new RenderCard(movie))
  //   movie.forEach(card => card.render());
  // } else if (path.length > 6) {
  //   const id = path.slice(6);
  //   
  // }
  switch (path) {
    case "/":
      mainWrapper.innerHTML = "";
      mainWrapper.appendChild(greeting.render());
      break;
    case "/list":
      mainWrapper.innerHTML = "";
      const movie = movies.map(movie => new RenderCard(movie))
      movie.forEach(card => card.render());
      break;
    case "/list-527f81e3-0b2f-4623-bc22-2be0818b8c42":
      mainWrapper.innerHTML = "";
      const detailedMov = movies.find(movie => movie.id === "527f81e3-0b2f-4623-bc22-2be0818b8c42")
      

      break;
    default:
      mainWrapper.innerText = "404";
      break;
  }
}

history.listen(listener => {
  renderRoute(listener.location.pathname);
});

renderRoute(history.location.pathname);

if (!localStorage.getItem("movies")) {
  localStorage.setItem("movies", JSON.stringify(movies));
}

const newFilmInfo = [];
const moviesList = JSON.parse(localStorage.getItem("movies"));
moviesList.push(newFilmInfo);
localStorage.setItem("movies", JSON.stringify(moviesList));


document.querySelector("#search").addEventListener("submit", e => {
  e.preventDefault();
  showMoviesPage();
});

async function showMoviesPage() {
  let searchQuery = document.querySelector("input[name=query]");
  movies.forEach(e => {
    if (!(e.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) + 1)) {
      document.getElementById(`${e.id}`).classList.toggle("hide");
    };
  });
};