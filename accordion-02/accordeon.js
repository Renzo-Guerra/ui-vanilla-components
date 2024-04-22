class Accordeon {
  constructor(element) {
    this.accordeon = element;
    this.header = this.accordeon.querySelector('.accordeon__header');
    this.list = this.accordeon.querySelector(".accordeon__list");
    this.isOpened = false;
    element.addEventListener("click", () => this.handleClick());
  }

  calcularHeight() {
    let totalheight = 0;
    this.list.querySelectorAll("li").forEach(item => {
      totalheight += item.offsetHeight;
    });

    return totalheight;
  }

  handleClick() {
    if (this.isOpened) {
      this.close();
    } else {
      this.open()
    }
  }

  open() {
    this.header.classList.add("accordeon__header--open");
    this.isOpened = true;
    this.list.style.height = `${this.calcularHeight()}px`;
  }

  close() {
    this.header.classList.remove("accordeon__header--open");
    this.isOpened = false;
    this.list.style.height = '';
  }

}

document.querySelectorAll(".accordeon").forEach(element => {
  new Accordeon(element);
});