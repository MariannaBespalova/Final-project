import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import movies from "./movies.json"

import CreateHeader from "./header/header";
import CreateMain from "./main/main";
import RenderCard from "./film-card/card";
import CreateFooter from './footer/footer';

const header = new CreateHeader();
header.render();

const main = new CreateMain();
main.render();

const movie = movies.map(movie => new RenderCard(movie))
movie.forEach(card => card.render());


const footer = new CreateFooter();
footer.render();
