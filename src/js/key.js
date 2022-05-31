import display from './display';

export default class Key {
  constructor(lang) {
    this.container = document.createElement('button');
    this.container.classList.add('keyboard__key');
    this.container.setAttribute('type', 'button');

    this.lang = lang;
    this.isShift = false;

    this.addListeners();
  }

  render() {
    if (this.lang.code === 'CapsLock') {
      this.indicator = document.createElement('span');
      this.indicator.classList.add('keyboard__indicator');

      this.container.append(this.indicator, this.lang.small);
    } else {
      this.container.innerHTML = this.lang.small;
    }

    this.container.setAttribute('data-keycode', `${this.lang.code}`);
    this.container.classList.add(`keyboard__key--${this.lang.code}`);

    if (this.lang.code === 'Space')
      this.container.setAttribute('aria-label', 'space');
    if (this.lang.code === 'MetaLeft')
      this.container.setAttribute('aria-label', 'metaleft');

    return this.container;
  }

  print(event) {
    const keyCode = event ? event.code : this.lang.code;
    let value = this.container.textContent;

    if (
      keyCode === this.lang.code &&
      !this.container.textContent.match('caps lock|shift|ctrl|alt')
    ) {
      if (this.lang.code === 'Enter') value = '\n';
      if (this.lang.code === 'Tab') value = '\t';
      if (this.lang.code === 'Space') value = ' ';

      display.print(value);
    }
  }

  switchCase(data) {
    if (data.shift) {
      this.container.textContent = this.isShift ? data.shift : data.small;
    }
  }

  addListeners() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.print(event);

      if (event.code === this.lang.code) {
        this.container.classList.add('keyboard__key--active');
      }

      if (event.getModifierState('CapsLock') || event.shiftKey) {
        this.isShift = true;

        if (this.indicator)
          this.indicator.classList.add('keyboard__indicator--active');
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.code === this.lang.code && event.code !== 'CapsLock') {
        this.container.classList.remove('keyboard__key--active');
      }

      if (!(event.getModifierState('CapsLock') || event.shiftKey)) {
        this.isShift = false;

        if (this.indicator) {
          this.indicator.classList.remove('keyboard__indicator--active');
          this.container.classList.remove('keyboard__key--active');
        }
      }
    });

    document.addEventListener('click', (event) => {
      const { target } = event;

      if (target.dataset.keycode === 'CapsLock') {
        this.isShift = !this.isShift;

        if (this.indicator) {
          target.classList.toggle('keyboard__key--active');
          this.indicator.classList.toggle('keyboard__indicator--active');
        }
      }

      if (target.dataset.keycode === this.lang.code) this.print();
    });

    this.container.addEventListener('mousedown', () => {
      if (this.lang.code !== 'CapsLock')
        this.container.classList.add('keyboard__key--active');
    });

    this.container.addEventListener('mouseup', () => {
      if (this.lang.code !== 'CapsLock')
        this.container.classList.remove('keyboard__key--active');
    });
  }
}
