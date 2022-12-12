class Display {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('display');
  }

  render() {
    const title = document.createElement('h1');
    this.textarea = document.createElement('textarea');

    title.classList.add('display__title');
    this.textarea.classList.add('display__textarea');

    this.textarea.setAttribute('aria-label', 'textarea');

    title.textContent = 'RSS Virtual Keyboard';

    this.container.append(title, this.textarea);

    return this.container;
  }

  print(value) {
    const startPos = this.textarea.selectionStart;
    this.textarea.focus();

    if (value === 'backspace') {
      if (!this.textarea.selectionStart) return;
      if (this.textarea.selectionStart !== this.textarea.value.length) {
        const chars = [...this.textarea.value];
        chars.splice(startPos - 1, 1);

        this.textarea.value = chars.join('');
        this.textarea.selectionEnd = startPos - 1;
      } else {
        this.textarea.value = this.textarea.value.slice(
          0,
          this.textarea.value.length - 1
        );
      }
    } else if (value === 'del') {
      if (this.textarea.selectionStart === this.textarea.value.length) return;

      this.textarea.value =
        this.textarea.value.slice(0, this.textarea.selectionStart) +
        this.textarea.value.slice(this.textarea.selectionStart + 1);

      this.textarea.selectionEnd = startPos;
    } else {
      this.textarea.setRangeText(
        value,
        this.textarea.selectionStart,
        this.textarea.selectionEnd
      );

      this.textarea.selectionStart += 1;
    }

    this.textarea.scrollTop = this.textarea.scrollHeight;
  }
}

const display = new Display();
export default display;
