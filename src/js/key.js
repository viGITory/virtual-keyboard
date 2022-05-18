export default class Key {
  constructor() {
    this.container = document.createElement('button');
    this.container.classList.add('keyboard__key');
    this.container.setAttribute('type', 'button');

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

  addListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.code === this.container.dataset.key) {
        this.container.classList.add('keyboard__key--active');
      }

      if (
        this.indicator &&
        (event.getModifierState('CapsLock') || event.shiftKey)
      ) {
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

      if (
        this.indicator &&
        !(event.getModifierState('CapsLock') || event.shiftKey)
      ) {
        this.indicator.classList.remove('keyboard__indicator--active');
        this.container.classList.remove('keyboard__key--active');
      }
    });
  }
}
