class Card {
  constructor(card) {
    this.cardHTMLElement = card;
    this.cardImgContainer = this.cardHTMLElement.querySelector(".card__images-container");
    this.images = this.cardImgContainer.querySelectorAll("img");
    this.cardImgContainer.addEventListener("mouseout", this.resetValues);
    this.cardImgContainer.addEventListener("mousemove", (event) => this.move(event.clientX, event.clientY))
  }

  resetValues = () => {
    for (const image of this.images) {
      image.style.transform = "";
    }
  }

  move(x, y) {
    // Eje central de la imagen
    const Y_MIDDLE = this.cardHTMLElement.offsetTop + (this.cardHTMLElement.offsetHeight / 2);
    const X_MIDDLE = this.cardHTMLElement.offsetLeft + (this.cardHTMLElement.offsetWidth / 2);

    const offsetX = ((x - X_MIDDLE) / X_MIDDLE);
    const offsetY = ((y - Y_MIDDLE) / Y_MIDDLE);

    // Translate the images by an x %
    this.images[0].style.transform = `translate(${offsetX * 50}px, ${offsetY * 50}px)`;
    this.images[1].style.transform = `translate(-50%, -30%) translate(${offsetX * -20}px, ${offsetY * -20}px)`;
  }
}

document.querySelectorAll(".card").forEach(card => {
  new Card(card);
});