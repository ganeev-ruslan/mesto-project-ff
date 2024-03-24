function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closePopUp(openedPopUp);
  }
}

export function openPopUp(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopUp(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}
