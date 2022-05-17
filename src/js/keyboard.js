import en from './lang/en';
import ru from './lang/ru';

import Key from './key';

let currentLang = JSON.parse(localStorage.getItem('vigitory-lang')) || en;
let isShift = false;

class Keyboard {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('keyboard');
  }

  render() {
    this.keys = currentLang.map((item) => new Key().render(item));

    for (let i = 0; i < 5; i += 1) {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');

      if (i === 0) row.append(...this.keys.slice(0, 14));
      else if (i === 1) row.append(...this.keys.slice(14, 28));
      else if (i === 2) row.append(...this.keys.slice(28, 41));
      else if (i === 3) row.append(...this.keys.slice(41, 54));
      else row.append(...this.keys.slice(54));

      this.container.append(row);
    }

    document.body.append(this.container);
  }

  switchCase() {
    this.keys.forEach((item, index) => {
      const key = item;

      if (currentLang[index].shift) {
        if (isShift) {
          key.textContent = currentLang[index].shift;
        } else {
          key.textContent = currentLang[index].small;
        }
      }
    });
  }

  addListeners() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('vigitory-lang', JSON.stringify(currentLang));
    });

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
