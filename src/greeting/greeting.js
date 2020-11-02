import html from "./greeting.html";
import { renderTemplate } from "../template-utils";

class Greeting {
  constructor() {
    this.greeting = renderTemplate(html)
  }

  render() {
    return this.greeting;
  }
}

export default Greeting;