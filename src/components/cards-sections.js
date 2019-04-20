import Component from './component';
import CardsSectionComponent from './cards-section';
import {createCardsSectionsTemplate} from '../templates/cards';

const SHOW_MORE_STEP = 5;
const FEATURED_CARDS_AMOUNT = 2;

export default class CardsSectionsComponent extends Component {
  constructor(data) {
    super(data);
    this._initialCount = SHOW_MORE_STEP;
    this._showMoreStep = SHOW_MORE_STEP;
    this._allCardsSectionComponent = null;
    this._featuredByCommentsComponent = null;
    this._featuredByRatingComponent = null;
    this._showMoreButtonStatus = true;
    this._onShowMoreClick = this._onShowMoreClick.bind(this);
  }

  get template() {
    return createCardsSectionsTemplate();
  }

  set onCardsChange(fn) {
    this._onCardsChange = fn;
  }

  set onCommentSubmit(fn) {
    this._onCommentSubmit = fn;
  }

  set onRatingSubmit(fn) {
    this._onRatingSubmit = fn;
  }

  updateMainBlockElement() {
    this._showMoreButtonStatus = (this._initialCount < this._filteredData.length);
    if (this._showMoreButtonStatus) {
      this._showMoreElement.classList.remove(`visually-hidden`);
    } else {
      this._showMoreElement.classList.add(`visually-hidden`);
    }
    this._replaceMainBlockElements(this._filteredData.slice(0, this._initialCount));
  }

  onSearch(value) {
    const initialData = this._data.slice();
    const resultData = initialData
      .filter((item) => item.title.toLowerCase().search(value.toLowerCase()) !== -1);
    this._replaceMainBlockElements(resultData);
    this._showMoreElement.classList.add(`visually-hidden`);
  }

  _filterCardsBy(attribute) {
    return this
      ._data
      .slice()
      .sort((a, b) => b[attribute] - a[attribute])
      .slice(0, FEATURED_CARDS_AMOUNT);
  }

  _replaceMainBlockElements(data) {
    this._mainListElement.removeChild(this._allCardsSectionComponent._element);
    this._allCardsSectionComponent.unrender();
    this._mainListElement.insertBefore(this._allCardsSectionComponent.render(data, this._getNewCardElement), this._showMoreElement);
  }

  render() {
    const element = super.render();
    const noControlsSetting = {value: false, controls: false};
    const controlsSetting = {value: true, controls: true};

    this._filteredData = this._data;
    this._mainListElement = element.querySelector(`#films-main-list`);
    this._ratedListElement = element.querySelector(`#films-rated-list`);
    this._commentedListElement = element.querySelector(`#films-commented-list`);

    const updateData = (updatedData, id) => {
      const index = this._data.findIndex((item) => item.id === id);
      CardsSectionsComponent.updateComponent(this._allCardsSectionComponent, updatedData, id);
      CardsSectionsComponent.updateComponent(this._featuredByCommentsComponent, updatedData, id);
      CardsSectionsComponent.updateComponent(this._featuredByRatingComponent, updatedData, id);
      if (index !== -1) {
        this._data[index] = Object.assign({}, updatedData);
        if (typeof this._onCardsChange === `function`) {
          this._onCardsChange(this._data[index], id);
        }
      }
    };

    const submitComment = (newData, id, popup) => {
      const index = this._data.findIndex((item) => item.id === id);
      if (index !== -1) {
        this._data[index] = Object.assign({}, newData);
        if (typeof this._onCommentSubmit === `function`) {
          this._onCommentSubmit(this._data[index], id, popup);
        }
      }
    };

    const submitRating = (newData, id, popup) => {
      const index = this._data.findIndex((item) => item.id === id);
      if (index !== -1) {
        this._data[index] = Object.assign({}, newData);
        if (typeof this._onRatingSubmit === `function`) {
          this._onRatingSubmit(this._data[index], id, popup);
        }
      }
    };

    this._allCardsSectionComponent = new CardsSectionComponent(this._data, controlsSetting);
    this._featuredByCommentsComponent = new CardsSectionComponent(this._data, noControlsSetting);
    this._featuredByRatingComponent = new CardsSectionComponent(this._data, noControlsSetting);

    this._mainListElement
      .insertBefore(this._allCardsSectionComponent.render(this._data.slice(0, this._initialCount)), this._showMoreElement);

    this._ratedListElement
      .insertAdjacentElement(`beforeend`, this._featuredByRatingComponent.render(this._filterCardsBy(`rating`), noControlsSetting));

    this._commentedListElement
      .insertAdjacentElement(`beforeend`, this._featuredByCommentsComponent.render(this._filterCardsBy(`commentsAmount`), noControlsSetting));

    this._allCardsSectionComponent.onCardChange = updateData;
    this._allCardsSectionComponent.onCommentSubmit = submitComment;
    this._allCardsSectionComponent.onRatingSubmit = submitRating;

    this._featuredByRatingComponent.onCardChange = updateData;
    this._featuredByRatingComponent.onCommentSubmit = submitComment;
    this._featuredByRatingComponent.onRatingSubmit = submitRating;

    this._featuredByCommentsComponent.onCardChange = updateData;
    this._featuredByCommentsComponent.onCommentSubmit = submitComment;
    this._featuredByCommentsComponent.onRatingSubmit = submitRating;

    return element;
  }

  update(filteredData) {
    this._initialCount = this._showMoreStep;
    this._filteredData = filteredData;
    this.updateMainBlockElement();
  }

  createListeners() {
    this._showMoreElement = this._element.querySelector(`.films-list__show-more`);
    this._showMoreElement.addEventListener(`click`, this._onShowMoreClick);
  }

  removeListeners() {
    this._showMoreElement.removeEventListener(`click`, this._onShowMoreClick);
    this._showMoreElement = null;
  }

  _onShowMoreClick() {
    if (this._filteredData.length > (this._initialCount + this._showMoreStep)) {
      this._initialCount += this._showMoreStep;
    } else {
      this._initialCount = this._filteredData.length;
    }
    if (this._initialCount === this._filteredData.length) {
      this._showMoreButtonStatus = false;
      this._showMoreElement.classList.add(`visually-hidden`);
    }
    this.updateMainBlockElement();
  }

  static updateComponent(component, updatedData, id) {
    const componentIndex = component.components.findIndex((item) => item._data.id === id);
    if (componentIndex !== -1) {
      component.components[componentIndex].update(updatedData);
    }
  }
}
