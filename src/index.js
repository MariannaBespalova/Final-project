import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { getHistory } from "./app-history";
import movies from "./movies.json";
import Header from "./header/header";
import Main from "./main/main";
import Card from "./film-card/card";
import Footer from "./footer/footer";
import Greeting from "./greeting/greeting";
import Movie from "./movie/movie";

const container = document.querySelector(".container");

const header = new Header();
container.appendChild(header.render());


const main = new Main();
container.appendChild(main.render());

const mainWrapper = document.querySelector("#content");
const greeting = new Greeting();
mainWrapper.appendChild(greeting.render())

const footer = new Footer();
container.appendChild(footer.render());

const history = getHistory();

if (!localStorage.getItem("movies")) {
  localStorage.setItem("movies", JSON.stringify(movies));
}

const movieData = JSON.parse(localStorage.getItem("movies"));

let arr = []

movieData.forEach(movie => arr.push(movie.id))

function renderRoute(path) {
  if (path === "/") {
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(greeting.render());
  } else if (path === "/list") {
    mainWrapper.innerHTML = "";
    const movie = movieData.map(movie => new Card(movie));
    movie.forEach(card => card.render());
  } else if (path === `/list-${(arr.find(id => id === path.slice(6)))}`) {
    mainWrapper.innerHTML = "";
    const findMovie = movieData.find(movie => movie.id === path.slice(6));
    const detailedMovie = new Movie(findMovie);
    mainWrapper.appendChild(detailedMovie.render());
  } else if (path === "/search-") {
    mainWrapper.innerHTML = "";
    const searchQuery = document.querySelector("input[name=query]");
    movieData.forEach(movie => {
      if ((movie.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) + 1)) {
        const findMovie = new Card(movie);
        findMovie.render();

      };
    });
  }
}


history.listen(listener => {
  renderRoute(listener.location.pathname);
});

renderRoute(history.location.pathname);