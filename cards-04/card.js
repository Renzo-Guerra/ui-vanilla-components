let buttons = document.querySelectorAll(".card__specs button").forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    button.classList.toggle("liked");
    button.children.item(0).classList.toggle('fa-solid');
    button.children.item(0).classList.toggle('fa-regular');
  });
})