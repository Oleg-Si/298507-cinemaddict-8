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
    this._onOpenStats = this._onOpenStats.bind(this);
  }

  get template() {
    return `<a href="${this._href}" class="main-navigation__item  ${this._checked ? `main-navigation__item--active` : ``} ${this._additional ? `main-navigation__item--additional` : ``}">${this._name} ${(this._count > 0) ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}
    </a>`;
  }

  _onFilter() {}
  _onOpenStats() {}

  set onFilter(func) {
    if (typeof func === `function`) {
      this._onFilter = func;
    }
  }
  set onOpenStats(func) {
    if (typeof func === `function`) {
      this._onOpenStats = func;
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilter);
    if (this._additional) {
      this._element.addEventListener(`click`, this._onOpenStats);
    }
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilter);
    if (this._additional) {
      this._element.addEventListener(`click`, this._onOpenStats);
    }
  }
}
