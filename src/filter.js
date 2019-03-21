import Component from '../src/component.js';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._href = data.href;
    this._count = data.count;
    this._checked = data.checked;
    this._additional = data.additional;

    this._onFilter = this._onFilter.bind(this);
  }

  get template() {
    return `<a href="${this._href}" class="main-navigation__item  ${this._checked ? `main-navigation__item--active` : ``} ${this._additional ? `main-navigation__item--additional` : ``}">${this._name} ${(this._count > 0) ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}
    </a>`;
  }

  _onFilter() {}

  set onFilter(func) {
    if (typeof func === `function`) {
      this._onFilter = func;
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilter);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilter);
  }
}
