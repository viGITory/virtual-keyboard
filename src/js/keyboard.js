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
    this.createRows();

    document.body.append(display.render(), this.container);
  }

  createTopRow() {
    this.activeLang = document.createElement('button');
    const row = document.createElement('div');
    const description = document.createElement('p');
    const emptyButton = document.createElement('button');

    this.activeLang.textContent =
      localStorage.getItem('vigitory-lang') === JSON.stringify(en)
        ? 'en'
        : 'ru';
    description.textContent = 'Press Ctrl + Alt to switch language';

    this.activeLang.classList.add('keyboard__key', 'keyboard__key--lang');
    row.classList.add('keyboard__bar');
    description.classList.add('keyboard__description');
    emptyButton.classList.add('keyboard__key', 'keyboard__key--empty');

    this.activeLang.setAttribute('type', 'button');
    emptyButton.setAttribute('type', 'button');

    return [this.activeLang, description, emptyButton];
  }

  createRows() {
    const buttons = [];

    this.keys = this.currentLang.map((item) => {
      const key = new Key();
      buttons.push(key.render(item));

      return key;
    });

    for (let i = 0; i < 6; i += 1) {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');

      if (i === 0) row.append(...this.createTopRow());
      else if (i === 1) row.append(...buttons.slice(0, 14));
      else if (i === 2) row.append(...buttons.slice(14, 28));
      else if (i === 3) row.append(...buttons.slice(28, 41));
      else if (i === 4) row.append(...buttons.slice(41, 54));
      else row.append(...buttons.slice(54));

      this.container.append(row);
    }
  }

  switchCase() {
    this.activeLang.textContent = this.currentLang === en ? 'en' : 'ru';
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
        this.currentLang = this.currentLang === en ? ru : en;
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

    this.activeLang.addEventListener('click', () => {
      this.currentLang = this.currentLang === en ? ru : en;
      this.activeLang.textContent = this.currentLang === en ? 'en' : 'ru';

      this.switchCase();
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
