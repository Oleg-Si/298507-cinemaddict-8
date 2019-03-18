import Component from '../src/component.js';
const moment = require(`moment`);

export default class FilmCard extends Component {
  constructor(data) {
    super();
    this._image = data.image;
    this._title = data.title;
    this._description = data.description;
    this._rating = data.rating;
    this._timeStamp = data.timeStamp;
    this._runtime = data.runtime;
    this._genre = data.genre;
    this._comments = data.comments;

    this._onCommentButtonClick = this._onCommentButtonClick.bind(this);
  }

  _getGenre() {
    return [...this._genre][Math.floor(Math.random() * 5)];
  }

  _onCommentButtonClick() {
    this._onClick();
  }

  get template() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._timeStamp).format(`Y`)}</span>
        <span class="film-card__duration">${moment.duration(this._runtime, `seconds`).hours()}h ${moment.duration(this._runtime, `seconds`).minutes()}m</span>
        <span class="film-card__genre">${this._getGenre()}</span>
      </p>
      <img src="${this._image}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comments} comments</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentButtonClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentButtonClick);
  }


}
