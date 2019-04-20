import {createFilterTemplate} from '../templates/filter';
import Component from './component';

export default class FilterComponent extends Component {
  constructor(data) {
    super(data);

    this._onClick = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get template() {
    return createFilterTemplate(this._data);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .addEventListener(`click`, this._onFilterClick);
    }
  }

  removeListeners() {
    if (this._element) {
      this
        ._element
        .removeEventListener(`click`, this._onFilterClick);
    }
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    return typeof this._onClick === `function` && this._onClick(this._element.id);
  }
}
