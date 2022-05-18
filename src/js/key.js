export default class Key {
  constructor() {
    this.container = document.createElement('button');
    this.container.classList.add('keyboard__key');
    this.container.setAttribute('type', 'button');
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
}
