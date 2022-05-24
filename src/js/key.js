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
    if (!currentLang.shift && !currentLang.code.match('Arrow|Space')) {
      this.container.classList.add('keyboard__key--fn');
    }

    if (currentLang.code === 'CapsLock') {
      this.indicator = document.createElement('span');
      this.indicator.classList.add('keyboard__indicator');

      this.container.append(this.indicator, currentLang.small);
    } else {
      this.container.innerHTML = currentLang.small;
    }

    this.container.setAttribute('data-key', `${currentLang.code}`);

    return this.container;
  }

  printText(event) {
    const keyCode = event.code || event.target.dataset.key;

    if (
      keyCode === this.container.dataset.key &&
      !this.container.textContent.match(
        'backspace|tab|capsLock|enter|shift|ctrl|alt|win|del'
      )
    ) {
      display.textContent += this.container.textContent;
    }
  }

  switchCase(data) {
    if (data.shift) {
      if (this.isShift) {
        this.container.textContent = data.shift;
      } else {
        this.container.textContent = data.small;
      }
    }
  }

  addListeners() {
    document.addEventListener('keydown', (event) => {
      display.focus();
      event.preventDefault();
      this.printText(event);

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

    document.addEventListener('click', (event) => {
      this.printText(event);
    });
  }
}
