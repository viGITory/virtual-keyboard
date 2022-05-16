import en from './lang/en';
import ru from './lang/ru';

import Key from './key';

let currentLang = en;

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


  init() {
    this.render();
  }
}

const keyboard = new Keyboard();
export default keyboard;
