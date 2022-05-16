export default class Key {
  constructor() {
    this.container = document.createElement('button');
    this.container.classList.add('keyboard__key');
    this.container.setAttribute('type', 'button');
  }

  render(currentLang) {
    this.container.setAttribute('data-key', `${currentLang.code}`);
    this.container.textContent = currentLang.small;

    return this.container;
  }
}
