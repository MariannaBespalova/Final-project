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
  if (path === "/") {
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(greeting.render());
  } else if (path === "/list") {
    mainWrapper.innerHTML = "";
    const movie = movies.map(movie => new RenderCard(movie))
    movie.forEach(card => card.render());
  } else if (path.length > 6) {
    mainWrapper.innerHTML = "";
    const findMovie = movies.find(movie => movie.id === path.slice(6));
    const detailedMovie = new CreateMovie(findMovie);
    mainWrapper.appendChild(detailedMovie.render());
  }
}

history.listen(listener => {
  renderRoute(listener.location.pathname);
});

renderRoute(history.location.pathname);

// if (!localStorage.getItem("movies")) {
//   localStorage.setItem("movies", JSON.stringify(movies));
// }

// const newFilmInfo = [];
// const moviesList = JSON.parse(localStorage.getItem("movies"));
// moviesList.push(newFilmInfo);
// localStorage.setItem("movies", JSON.stringify(moviesList));


document.querySelector("#search").addEventListener("submit", event => {
  event.preventDefault();
  showMoviesPage();
  console.log("search")
});

function showMoviesPage() {
  let searchQuery = document.querySelector("input[name=query]");
  console.log(searchQuery)
  movies.forEach(movie => {
    console.log(!(movie.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) + 1))
    if (!(movie.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) + 1)) {
      document.getElementById(`${movie.id}`).classList.toggle("hide");
    };
  });
};