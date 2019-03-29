import Component from '../src/component.js';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._href = data.href;
    this._count = data.count;
    this._checked = data.checked;

    this._onFilter = this._onFilter.bind(this);
  }

  get template() {
    return `<a href="${this._href}" class="main-navigation__item ${this._checked ? `main-navigation__item--active` : ``}">${this._name} ${(this._count > 0) ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}
    </a>`;
  }

  _onFilter() {
    this._onClick();
    this._element.classList.add(`main-navigation__item--active`);
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilter);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilter);
  }
}
