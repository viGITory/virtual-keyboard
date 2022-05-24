import en from './lang/en';
import ru from './lang/ru';

import display from './display';
import Key from './key';

class Keyboard {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('keyboard');
  }

  render() {
    this.keys = this.currentLang.map((item) => new Key().render(item));

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

    document.body.append(display, this.container);
    display.focus();
  }

  switchCase() {
    this.keys.forEach((item, index) => {
      const key = item;

      if (this.currentLang[index].shift) {
        if (isShift) {
          key.textContent = this.currentLang[index].shift;
        } else {
          key.textContent = this.currentLang[index].small;
        }
      }
    });
  }

  addListeners() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('vigitory-lang', JSON.stringify(this.currentLang));
    });

    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.altKey) {
        if (this.currentLang === en) this.currentLang = ru;
        else this.currentLang = en;
      }

      if (event.shiftKey || event.getModifierState('CapsLock')) {
        this.switchCase();
      }
    });

    document.addEventListener('keyup', (event) => {
      if (!event.shiftKey && !event.getModifierState('CapsLock')) {
        this.switchCase();
      }
    });
  }

  init() {
    this.currentLang = JSON.parse(localStorage.getItem('vigitory-lang')) || en;

    this.render();
    this.addListeners();
  }
}

const keyboard = new Keyboard();
export default keyboard;
