import createElement from '../src/create-element.js';
import cloneDeep from 'lodash.clonedeep';

export default class Component {
  constructor(data) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
    this._data = cloneDeep(data);
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  /*
  set onClick(func) {
    if (typeof func === `function`) {
      this._onClick = func;
    }
  }
  */

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {}
  unbind() {}

  update(data) {
    this._data = Object.assign({}, data);
  }
}
