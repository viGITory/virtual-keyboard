import en from './lang/en';
import ru from './lang/ru';

import Key from './key';

let currentLang = en;
let isShift = false;

class Keyboard {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('keyboard');
  }

  render() {
    this.keys = currentLang.map((item) => new Key().render(item));

    this.container.append(...this.keys);
    document.body.append(this.container);
  }

  switchCase() {
    this.keys.forEach((key, index) => {
      if (isShift && currentLang[index].shift) {
        key.textContent = currentLang[index].shift;
      } else {
        key.textContent = currentLang[index].small;
      }
    });
  }

  addListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.altKey) {
        if (currentLang === en) currentLang = ru;
        else currentLang = en;
      }

      if (event.shiftKey || event.getModifierState('CapsLock')) {
        isShift = true;

        this.switchCase();
      }
    });

    document.addEventListener('keyup', (event) => {
      if (!event.shiftKey && !event.getModifierState('CapsLock')) {
        isShift = false;

        this.switchCase();
      }
    });
  }

  init() {
    this.render();
    this.addListeners();
  }
}

const keyboard = new Keyboard();
export default keyboard;
