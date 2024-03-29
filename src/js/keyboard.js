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
    this.langButton = document.createElement('button');
    const description = document.createElement('p');
    this.themeButton = document.createElement('button');

    this.langButton.textContent = localStorage.getItem('vigitory-lang')
      ? 'ru'
      : 'en';
    description.textContent =
      'To switch language, press Ctrl + Alt or click on en/ru button (OS Windows)';

    this.langButton.classList.add('keyboard__key', 'keyboard__key--lang');
    description.classList.add('keyboard__description');
    this.themeButton.classList.add('keyboard__key', 'keyboard__key--theme');

    this.langButton.setAttribute('type', 'button');
    this.themeButton.setAttribute('type', 'button');
    this.themeButton.setAttribute('aria-label', 'theme');

    return [this.langButton, description, this.themeButton];
  }

  createRows() {
    const buttons = [];

    this.keys = this.currentLang.map((item) => {
      const key = new Key(item);
      buttons.push(key.render());

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
    this.currentLang.forEach((data, index) => {
      this.keys[index].switchCase(data);
    });
  }

  switchLang() {
    this.currentLang = this.currentLang === en ? ru : en;
    this.langButton.textContent = this.currentLang === en ? 'en' : 'ru';
  }

  addListeners() {
    window.addEventListener('beforeunload', () => {
      if (this.currentLang === ru) localStorage.setItem('vigitory-lang', 'ru');
      else localStorage.removeItem('vigitory-lang');
    });

    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.altKey) {
        this.switchLang();
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

    document.addEventListener('click', (event) => {
      if (event.target.dataset.keycode === 'CapsLock') {
        this.switchCase();
      }
    });

    this.langButton.addEventListener('click', () => {
      this.switchLang();
      this.switchCase();
    });
  }

  init() {
    this.currentLang = localStorage.getItem('vigitory-lang') ? ru : en;

    this.render();
    this.addListeners();
  }
}

const keyboard = new Keyboard();
export default keyboard;
