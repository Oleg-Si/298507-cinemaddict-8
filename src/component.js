import createElement from '../src/create-element.js';

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
    this._onClick = null;
    this._userState = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  set onClick(func) {
    if (typeof func === `function`) {
      this._onClick = func;
    }
  }

  bind() {}

  unbind() {}

  update() {}

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
