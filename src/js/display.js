class Display {
  constructor() {
    this.container = document.createElement('textarea');
    this.container.classList.add('display');
  }

  render() {
    return this.container;
  }

  print(value) {
    const startPos = this.container.selectionStart;
    this.container.focus();

    if (value === 'backspace') {
      if (!this.container.selectionStart) return;
      if (this.container.selectionStart !== this.container.value.length) {
        const chars = [...this.container.value];
        chars.splice(startPos - 1, 1);

        this.container.value = chars.join('');
        this.container.selectionEnd = startPos - 1;
      } else {
        this.container.value = this.container.value.slice(
          0,
          this.container.value.length - 1
        );
      }
    } else if (value === 'del') {
      if (this.container.selectionStart === this.container.value.length) return;

      this.container.value =
        this.container.value.slice(0, this.container.selectionStart) +
        this.container.value.slice(this.container.selectionStart + 1);

      this.container.selectionEnd = startPos;
    } else {
      this.container.setRangeText(
        value,
        this.container.selectionStart,
        this.container.selectionEnd
      );

      this.container.selectionStart += 1;
    }

    this.container.scrollTop = this.container.scrollHeight;
  }
}

const display = new Display();
export default display;
