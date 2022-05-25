class Display {
  constructor() {
    this.container = document.createElement('textarea');
    this.container.classList.add('display');
  }

  render() {
    return this.container;
  }
}

const display = new Display();
export default display;
