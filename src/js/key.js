import display from './display';

export default class Key {
  constructor() {
    this.container = document.createElement('button');
    this.container.classList.add('keyboard__key');
    this.container.setAttribute('type', 'button');
    this.isShift = false;

    this.addListeners();
  }

  render(currentLang) {
    if (currentLang.code === 'CapsLock') {
      this.indicator = document.createElement('span');
      this.indicator.classList.add('keyboard__indicator');

      this.container.append(this.indicator, currentLang.small);
    } else {
      this.container.innerHTML = currentLang.small;
    }

    this.container.setAttribute('data-key', `${currentLang.code}`);
    this.container.classList.add(`keyboard__key--${currentLang.code}`);

    return this.container;
  }

  print(event) {
    const keyCode = event ? event.code : this.container.dataset.key;
    let value = this.container.textContent;

    if (
      keyCode === this.container.dataset.key &&
      !this.container.textContent.match('capsLock|shift|ctrl|alt')
    ) {
      if (this.container.dataset.key === 'Enter') value = '\n';
      if (this.container.dataset.key === 'Tab') value = '\t';
      if (this.container.dataset.key === 'Space') value = ' ';

      display.print(value);
    }
  }

  switchCase(data) {
    if (data.shift) {
      this.container.textContent = this.isShift ? data.shift : data.small;
    }
  }

  addListeners() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.print(event);

      if (event.code === this.container.dataset.key) {
        this.container.classList.add('keyboard__key--active');
      }

      if (event.getModifierState('CapsLock') || event.shiftKey) {
        this.isShift = true;

        if (this.indicator)
          this.indicator.classList.add('keyboard__indicator--active');
      }
    });

    document.addEventListener('keyup', (event) => {
      if (
        event.code === this.container.dataset.key &&
        event.code !== 'CapsLock'
      ) {
        this.container.classList.remove('keyboard__key--active');
      }

      if (!(event.getModifierState('CapsLock') || event.shiftKey)) {
        this.isShift = false;

        if (this.indicator) {
          this.indicator.classList.remove('keyboard__indicator--active');
          this.container.classList.remove('keyboard__key--active');
        }
      }
    });

    this.container.addEventListener('click', () => {
      this.print();
    });
  }
}
