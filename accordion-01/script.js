class Item {
  constructor(elem) {
    this.element = elem;
    this.summary = elem.querySelector('.faq__title-container');
    this.content = elem.querySelector('.faq__content');
    this.expandIcon = this.summary.querySelector('.faq__expand-icon');
    this.animation = null;
    this.isClosing = false;
    this.isExpading = false;
    this.summary.addEventListener('click', (e) => this.handleClick(e));
  }

  handleClick(e) {
    // Previene la apertura o el cierre abrupto que se genera por default.
    e.preventDefault();

    // Le agregamos un overflow hidden para que al hacer la animacion 
    // de expandirse o cerrarse se muestre como va apareciendo o desapareciendo el contenido
    this.element.style.overflow = 'hidden';

    // Si se está cerrando o si el elemento no está expandido
    if (this.isClosing || !this.element.open) {
      this.open();
      // Si se está abriendo o si el elemento está expandido 
    } else if (this.isExpading || this.element.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;
    const startHeight = `${this.element.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }


    this.animation = this.element.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => {
      this.expandIcon.setAttribute('src', 'assets/plus.svg');
      this.expandIcon.setAttribute('alt', 'Plus');

      // Una vez terminada la animacion seteamos el acordeon como cerrado
      return this.onAnimationFinish(false);
    }

    this.animation.oncancel = () => {
      this.expandIcon.setAttribute('src', 'assets/plus.svg');
      this.expandIcon.setAttribute('alt', 'Plus');
      return this.isClosing = false;
    }
  }

  open() {
    this.element.style.height = `${this.element.offsetHeight}px`;
    this.element.open = true;
    this.expand();
  }


  expand() {
    this.isExpading = true;
    // Se toma como inicio el tope del elemento
    const startHeight = `${this.element.offsetHeight}px`;
    // Se toma como fin la altura del summary con la altura del content
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

    // Esto es por si el usuario clickea repetidasveces de manera consecutiva
    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.element.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 350,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => {
      this.expandIcon.setAttribute('src', 'assets/minus.svg');
      this.expandIcon.setAttribute('alt', 'Minus');

      // Una vez termine la animacion seteamos el acordeon como expandido.
      return this.onAnimationFinish(true);
    }

    this.animation.oncancel = () => {
      this.expandIcon.setAttribute('src', 'assets/minus.svg');
      this.expandIcon.setAttribute('alt', 'Minus');

      return this.isExpading = false;
    }
  }

  onAnimationFinish(open) {
    this.element.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpading = false;
    /*
      Estas 2 líneas de código eliminan cualquier altura y 
      desbordamiento personalizados que hayan sido aplicados 
      al elemento, lo que podría ser útil para restablecer el 
      aspecto y comportamiento predeterminados del elemento.
    */
    this.element.style.height = '';
    this.element.style.overflow = '';
  }
}


// Se generan los Items acordeon
document.querySelectorAll('.faq').forEach(elem => {
  new Item(elem);
});