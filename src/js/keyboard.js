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
    const buttons = [];

    this.keys = this.currentLang.map((item) => {
      const key = new Key();
      buttons.push(key.render(item));

      return key;
    });

    for (let i = 0; i < 5; i += 1) {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');

      if (i === 0) row.append(...buttons.slice(0, 14));
      else if (i === 1) row.append(...buttons.slice(14, 28));
      else if (i === 2) row.append(...buttons.slice(28, 41));
      else if (i === 3) row.append(...buttons.slice(41, 54));
      else row.append(...buttons.slice(54));

      this.container.append(row);
    }

    document.body.append(display, this.container);
    display.focus();
  }

  switchCase() {
    this.currentLang.forEach((data, index) => {
      this.keys[index].switchCase(data);
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
