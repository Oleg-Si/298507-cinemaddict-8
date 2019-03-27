import Component from '../src/component.js';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._href = data.href;
    this._count = data.count;
    this._checked = data.checked;

    this._onStatistic = this._onStatistic.bind(this);
  }

  get template() {
    return `<a href="${this._href}" class="main-navigation__item main-navigation__item--additional ${this._checked ? `main-navigation__item--active` : ``}">${this._name} ${(this._count > 0) ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}
    </a>`;
  }

  _onStatistic() {
    this._onClick();
    this._element.classList.add(`main-navigation__item--active`);
  }

  bind() {
    this._element.addEventListener(`click`, this._onStatistic);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onStatistic);
  }
}
