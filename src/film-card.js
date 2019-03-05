import createElement from '../src/create-element.js';

export default class filmCard {
  constructor(data) {
    this._image = data.image;
    this._title = data.title;
    this._description = data.description;
    this._rating = data.rating;
    this._year = data.year;
    this._time = data.time;
    this._genre = data.genre;
    this._comments = data.comments;
  }

  _formatTime(seconds) {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);

    return `${hour}h ${minute}m`;
  }

  _getYear() {
    return [...this._year][Math.floor(Math.random() * 5)];
  }

  _getGenre() {
    return [...this._genre][Math.floor(Math.random() * 5)];
  }

  _onCommentButtonClick() {
    //console.log('top');
  }

  get template() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._getYear()}</span>
        <span class="film-card__duration">${this._formatTime(this._time)}</span>
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

  onClick() {
    this._element.querySelector(`button.film-card__comments`).addEventListener('click', this._onCommentButtonClick.bind(this));
  }

  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }

    this._element = createElement(this.template);
    container.appendChild(this._element);
  }
}
