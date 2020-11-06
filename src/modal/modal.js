import html from "./modal.html";
import { renderTemplate } from "../template-utils";



class EditMovie {
  constructor(movie) {
    if (movie === null || movie === undefined) {
      this.form = renderTemplate(html);
    }
    this.form = renderTemplate(html, { movie });
  }

  onAddFieldClick() {
    const addField = document.querySelector("#add-field");
    addField.addEventListener("click", (event) => {
      if (event.target.closest(".btn-add-field")) {
        const newField = document.createElement("div");
        newField.className = "form-group row new-fields";
        newField.innerHTML = `<div class="col-sm-5">
                                    <input required type="text" class="form-control" placeholder="Должность" name="newPos">
                                </div>
                                <div class="col-sm-5">
                                    <input required type="text" class="form-control" placeholder="Имя" name="newName">
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-danger btn-sm btn-remove-field" type="button"><svg class="octicon octicon-x" viewBox="0 0 14 18" version="1.1" width="14" height="18" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg></button>
                                </div>`;
        addField.appendChild(newField);
      } else if (event.target.closest(".btn-remove-field")) {
        event.target.closest(".new-fields").remove();
      }
    })
  }

  render() {
    document.body.appendChild(this.form);
    this.onAddFieldClick();
  }

  hide() {
    document.body.removeChild(this.form);
  }
}

export default EditMovie;