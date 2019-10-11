import ButtonState from "../blocks/search/__button/search__button";

const buttonState = ButtonState();
const formSearch = document.forms.searchForm;
const { inputSearch } = formSearch.elements;
const btnSearch = document.querySelector(".search__button");
let isValid = true;

export default class Validate {
  constructor() {
    this.sendForm();
  }

  static activateError(e) {
    e.parentNode.classList.add("search__input-container-invalid");
  }

  static resetError(e) {
    const errorElement = document.querySelector(`#error-${e.id}`);
    e.parentNode.classList.remove("search__input-container-invalid");
    errorElement.textContent = "";
    e.classList.remove("err");
  }

  static isInputLength(e) {
    if (e.value.length >= 2 && e.value.length <= 30) {
      Validate.resetError(e);
      return true;
    }
    return false;
  }

  static validate(e) {
    const errorElement = document.querySelector(`#error-${e.id}`);
    if (!e.checkValidity()) {
      e.classList.add("err");
      errorElement.textContent = "Нужно ввести ключевое слово";
      Validate.activateError(errorElement);
      buttonState.deactive(btnSearch);
      return false;
    } else if (!Validate.isInputLength(e)) {
      e.classList.add("err");
      errorElement.textContent = "Введите от 2 до 30 символов";
      Validate.activateError(errorElement);
      buttonState.deactive(btnSearch);
      return false;
    }
    return true;
  }

  handleValidate(evt) {
    Validate.resetError(evt.target);
    Validate.validate(evt.target);

    if (!inputSearch.classList.contains("err")) {
      buttonState.active(btnSearch);
      isValid = true;
    }
  }

  sendForm() {
    const inputs = Array.from(formSearch.elements);
    // console.log(inputs);

    inputs.forEach(elem => {
      if (elem.id !== btnSearch.id) {
        if (!Validate.validate(elem)) isValid = false;
      }
    });

    if (isValid) {
      // console.log("it's work! :)");
    } else {
      // console.log("don't work! :(");
    }
  }
}

inputSearch.addEventListener("input", elem =>
  new Validate().handleValidate(elem)
);

// function activateError(e) {
//   e.parentNode.classList.add("search__input-container-invalid");
// }

// function resetError(e) {
//   const errorElement = document.querySelector(`#error-${e.id}`);

//   e.parentNode.classList.remove("search__input-container-invalid");
//   errorElement.textContent = "";
//   e.classList.remove("err");
// }

// function isInputLength(e) {
//   if (e.value.length >= 2 && e.value.length <= 30) {
//     resetError(e);
//     return true;
//   }

//   return false;
// }

// function validate(e) {
//   const errorElement = document.querySelector(`#error-${e.id}`);

//   if (!e.checkValidity()) {
//     e.classList.add("err");
//     errorElement.textContent = "Нужно ввести ключевое слово";
//     activateError(errorElement);
//     buttonState.deactive(btnSearch);
//     return false;
//   } else if (!isInputLength(e)) {
//     e.classList.add("err");
//     errorElement.textContent = "Введите от 2 до 30 символов";
//     activateError(errorElement);
//     buttonState.deactive(btnSearch);
//     return false;
//   }

//   return true;
// }

// function handleValidate(evt) {
//   resetError(evt.target);
//   validate(evt.target);

//   if (!inputSearch.classList.contains("err")) {
//     buttonState.active(btnSearch);
//     isValid = true;
//   }
// }

// inputSearch.addEventListener("input", handleValidate);

// export default function sendForm() {
//   const inputs = Array.from(form.elements);

//   inputs.forEach(elem => {
//     if (elem.id !== btnSearch.id) {
//       if (!validate(elem)) isValid = false;
//     }
//   });

//   if (isValid) {
//     // console.log("it's work! :)");
//   } else {
//     // console.log("don't work! :(");
//   }
// }
