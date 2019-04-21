import {createPopupTemplate, createCommentTemplate} from '../templates/popup';
import {createElement} from '../lib/element';
import Component from './component';


const RATING_FIELD_TEXT = `Your rate`;
const KeyCode = {
  ESC: 27,
  ENTER: 13
};
const CommentBorderSetting = {
  ERROR: `3px solid #8B0000`,
  DEFAULT: `1px solid #979797`
};
const RatingElementColor = {
  DEFAULT: `#d8d8d8`,
  ERROR: `#8B0000`,
  CHECKED: `#ffe800`
};

const Emoji = {
  'sleeping': `😴`,
  'neutral-face': `😐`,
  'grinning': `😀`
};

export default class PopupComponent extends Component {
  constructor(data) {
    super(data);

    this._onClose = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscClick = this._onEscClick.bind(this);
    this._onRatingChange = this._onRatingChange.bind(this);
    this._onCommentsKeydown = this._onCommentsKeydown.bind(this);
    this._onCommentRemove = this._onCommentRemove.bind(this);
    this._onMarkAsWatchedButtonClick = this._onMarkAsWatchedButtonClick.bind(this);
    this._onAddToWatchListButtonClick = this._onAddToWatchListButtonClick.bind(this);
    this._onAddToFavoriteButtonClick = this._onAddToFavoriteButtonClick.bind(this);
    this._onCommentFormInput = this._onCommentFormInput.bind(this);
    this.enableCommentForm = this.enableCommentForm.bind(this);
    this.showCommentSubmitError = this.showCommentSubmitError.bind(this);
    this.showNewRating = this.showNewRating.bind(this);
    this.showRatingSubmitError = this.showRatingSubmitError.bind(this);
    this._onEmojiClick = this._onEmojiClick.bind(this);
  }

  get template() {
    return createPopupTemplate(this._data);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  set onCommentSubmit(fn) {
    this._onCommentSubmit = fn;
  }

  set onRatingSubmit(fn) {
    this._onRatingSubmit = fn;
  }

  showNewRating() {
    this._element.querySelector(`.film-details__user-rating`).textContent = `${RATING_FIELD_TEXT} ${this._data.popup.yourRating}`;
    this._setRatingElementsDisbility(false);
    this._element.querySelector(`[for="${this._ratingElement.id}"]`)
      .style.backgroundColor = RatingElementColor.CHECKED;
  }

  showRatingSubmitError() {
    const labelElement = this._element.querySelector(`[for="${this._ratingElement.id}"]`);
    this._element
      .querySelector(`[value="${this._previousRatingValue}"]`).checked = true;
    this._data.popup.yourRating = this._previousRatingValue;
    labelElement.classList.add(`shake`);
    this._setRatingElementsDisbility(false);
    labelElement.style.backgroundColor = RatingElementColor.ERROR;
  }

  enableCommentForm() {
    this._commentInputElement.disabled = false;
    this._commentsListElement
      .appendChild(PopupComponent.createComment({comment: this._commentInputElement.value, author: `Your comment`,
        date: new Date(), emotion: this._getEmojiValue()}));
    this._userControlsElement
      .classList.remove(`visually-hidden`);
    this._watchedStatusElement
      .innerHTML = this._data.isWatched ? `Already watched` : `Will watch`;
    this._commentsCountElement.innerHTML = this._data.popup.commentsList.length;
    this._commentInputElement.value = ``;
  }

  showCommentSubmitError() {
    this._data.popup.commentsList.pop();
    this._commentInputElement.style.border = CommentBorderSetting.ERROR;
    this._element.querySelector(`.film-details__add-emoji-label`).classList.add(`shake`);
    this._commentInputElement.disabled = false;
    this._commentInputElement.addEventListener(`input`, this._onCommentFormInput);
  }

  _setRatingElementsDisbility(value) {
    this._ratingElements.forEach((item) => {
      item.disabled = value;
    });
  }

  _getEmojiValue() {
    const emojiElement = this._element.querySelector(`.film-details__emoji-list`);
    const inputElements = emojiElement.querySelectorAll(`input`);
    const checkedElement = Array.from(inputElements).find((element) => element.checked);
    return checkedElement.value;
  }

  _isYourComment() {
    return this._data.popup.commentsList.some((comment) => comment.author === `Your comment`);
  }

  _addComment(comment) {
    this._data.popup.commentsList.push({
      comment,
      author: `Your comment`,
      date: new Date(),
      emotion: this._getEmojiValue()
    });
  }

  render() {
    const element = super.render();
    this._commentsListElement = element.querySelector(`.film-details__comments-list`);
    this._commentInputElement = element.querySelector(`.film-details__comment-input`);
    this._userControlsElement = element.querySelector(`.film-details__user-rating-controls`);
    this._commentsCountElement = element.querySelector(`.film-details__comments-count`);
    this._watchedStatusElement = this._element.querySelector(`.film-details__watched-status`);
    return element;
  }

  createListeners() {
    if (this._element) {
      this._closeButtonElement = this._element.querySelector(`.film-details__close-btn`);
      this._ratingElements = this._element.querySelectorAll(`.film-details__user-rating-input`);
      this._commentsElement = this._element.querySelector(`.film-details__comments-wrap`);
      this._addToListElement = this._element.querySelector(`#list`);
      this._addToWatchedElement = this._element.querySelector(`#watched`);
      this._addToFavoriteElement = this._element.querySelector(`#favorite`);
      this._removeCommentElement = this._element.querySelector(`.film-details__watched-reset`);
      this._element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._onEmojiClick);

      this._closeButtonElement.addEventListener(`click`, this._onCloseButtonClick);
      this._ratingElements.forEach((input) => {
        input.addEventListener(`click`, this._onRatingChange);
      });
      this._commentsElement.addEventListener(`keydown`, this._onCommentsKeydown);
      this._addToListElement.addEventListener(`click`, this._onAddToWatchListButtonClick);
      this._addToWatchedElement.addEventListener(`click`, this._onMarkAsWatchedButtonClick);
      this._addToFavoriteElement.addEventListener(`click`, this._onAddToFavoriteButtonClick);
      this._removeCommentElement.addEventListener(`click`, this._onCommentRemove);
      window.addEventListener(`keydown`, this._onEscClick);
    }
  }

  removeListeners() {
    if (this._element) {
      this._closeButtonElement.removeEventListener(`submit`, this._onSubmitButtonClick);
      this._ratingElements.forEach((input) => {
        input.removeEventListener(`click`, this._onRatingChange);
      });
      this._commentsElement.removeEventListener(`keydown`, this._onCommentsKeydown);
      this._addToListElement.removeEventListener(`click`, this._onAddToWatchListButtonClick);
      this._addToWatchedElement.removeEventListener(`click`, this._onMarkAsWatchedButtonClick);
      this._addToFavoriteElement.removeEventListener(`click`, this._onAddToFavoriteButtonClick);
      this._removeCommentElement.removeEventListener(`click`, this._onCommentRemove);
      window.removeEventListener(`keydown`, this._onEscClick);
      this._element.querySelector(`.film-details__emoji-list`).removeEventListener(`change`, this._onEmojiClick);

      this._closeButtonElement = null;
      this._ratingElements = null;
      this._commentsElement = null;
      this._addToListElement = null;
      this._addToWatchedElement = null;
      this._addToFavoriteElement = null;
      this._removeCommentElement = null;
    }
  }

  _onMarkAsWatchedButtonClick() {
    this._data.isWatched = !this._data.isWatched;
    this._watchedStatusElement
      .innerHTML = this._data.isWatched ? `Already watched` : `Will watch`;
  }

  _onAddToWatchListButtonClick() {
    this._data.isOnWatchlist = !this._data.isOnWatchlist;
  }

  _onAddToFavoriteButtonClick() {
    this._data.isFavorite = !this._data.isFavorite;
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    this._data.commentsAmount = this._data.popup.commentsList.length;
    if (typeof this._onClose === `function`) {
      this._onClose(this._data);
    }
  }

  _onEscClick(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._onCloseButtonClick(evt);
    }
  }

  _onEmojiClick() {
    const emojiInputs = this._element.querySelector(`.film-details__emoji-list`).querySelectorAll(`.film-details__emoji-item`);
    emojiInputs.forEach((el) => {
      if (el.checked) {
        const emoji = el.getAttribute(`value`);
        document.querySelector(`.film-details__add-emoji-label`).textContent = Emoji[emoji];
      }
    });
    document.querySelector(`#add-emoji`).checked = false;
  }

  _onCommentFormInput() {
    this._commentInputElement.style.border = CommentBorderSetting.DEFAULT;
  }

  _onCommentsKeydown(evt) {
    if (evt.keyCode === KeyCode.ENTER && evt.ctrlKey && this._commentInputElement.value) {
      this._commentInputElement.style.border = CommentBorderSetting.DEFAULT;
      this._addComment(this._commentInputElement.value);
      this._commentInputElement.removeEventListener(`input`, this._onCommentFormInput);
      this._commentInputElement.disabled = true;
      if (typeof this._onCommentSubmit === `function`) {
        this._onCommentSubmit(this._data, this);
      }
    }
  }

  _onCommentRemove() {
    if (this._isYourComment()) {
      let index;

      this._data.popup.commentsList.forEach((item, id) => {
        if (item.author === `Your comment`) {
          index = id;
        }
      });

      this._data.popup.commentsList.splice(index, 1);
      this._commentsListElement
        .removeChild(this._commentsListElement.querySelector(`.film-details__comment:nth-child(${index + 1})`));
      this._commentsCountElement.innerHTML = this._data.popup.commentsList.length;

      if (!this._isYourComment()) {
        this._userControlsElement.classList.add(`visually-hidden`);
      }
    }
  }

  _onRatingChange(evt) {
    this._previousRatingValue = this._data.popup.yourRating;
    this._data.popup.yourRating = evt.target.value;
    this._ratingElement = evt.target;
    this._setRatingElementsDisbility(true);
    this._element.querySelectorAll(`.film-details__user-rating-label`).forEach((element) => {
      element.style.backgroundColor = RatingElementColor.DEFAULT;
    });
    if (typeof this._onRatingSubmit === `function`) {
      this._onRatingSubmit(this._data, this);
    }
  }

  static createComment(comment) {
    return createElement(
        createCommentTemplate(comment)
    );
  }
}
