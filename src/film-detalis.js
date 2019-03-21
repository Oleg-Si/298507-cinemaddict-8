import Component from '../src/component.js';
import moment from 'moment';

const Emoji = {
  'sleeping': `😴`,
  'neutral-face': `😐`,
  'grinning': `😀`
};

export default class FilmDetalis extends Component {
  constructor(data) {
    super();
    this._image = data.image;
    this._title = data.title;
    this._description = data.description;
    this._rating = data.rating;
    this._year = data.year;
    this._timeStamp = data.timeStamp;
    this._runtime = data.runtime;
    this._genre = data.genre;
    this._userRating = data.userRating;
    this._userComments = data.userComments;
    this._userEmoji = data.userEmoji;
    this._userCommentsDate = data.userCommentsDate;
    this._userState = data.userState;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onUserRatingChange = this._onUserRatingChange.bind(this);
    this._onUserRatingClick = this._onUserRatingClick.bind(this);
    this._onCommentKeydown = this._onCommentKeydown.bind(this);
    this._onUserCommentSend = this._onUserCommentSend.bind(this);
    this._onEmojiClick = this._onEmojiClick.bind(this);
    this._onWatchedResetButtonClick = this._onWatchedResetButtonClick.bind(this);
    this._onWatchedButtonClick = this._onWatchedButtonClick.bind(this);
  }

  _getGenre() {
    return [...this._genre][Math.floor(Math.random() * 5)];
  }
  _getUserComments() {
    const allUserComents = this._userComments.map((el, i) => {
      const template = `<li class="film-details__comment">
        <span class="film-details__comment-emoji">${Emoji[this._userEmoji[i]]}</span>
        <div>
        <p class="film-details__comment-text">${el}</p>
        <p class="film-details__comment-info">
        <span class="film-details__comment-author">Tim Macoveev</span>
        <span class="film-details__comment-day">${moment(parseInt(this._userCommentsDate[i], 10)).fromNow()}</span>
        </p>
        </div>
      </li>`;
      el = template;

      return el;
    });

    return allUserComents.join(``);
  }

  _onCloseButtonClick() {
    this._onClick();
  }

  _onWatchedResetButtonClick() {
    this._element.querySelector(`.film-details__watched-status`).classList.remove(`film-details__watched-status--active`);
    this._element.querySelector(`.film-details__control-input#watched`).checked = false;
  }
  _onWatchedButtonClick() {
    this._element.querySelector(`.film-details__watched-status`).classList.add(`film-details__watched-status--active`);
  }
  _onEmojiClick() {
    if (event.target.classList.contains(`film-details__emoji-item`)) {
      const emoji = event.target.getAttribute(`value`);
      document.querySelector(`.film-details__add-emoji-label`).textContent = Emoji[emoji];
    }
    document.querySelector(`#add-emoji`).checked = false;
  }

  _onUserRatingChange() {}
  _onUserCommentSend() {}

  _getNewData() {
    const formData = new FormData(this._element.querySelector(`form.film-details__inner`));
    const newData = this._processForm(formData);
    newData.userCommentsDate = (moment().valueOf());

    return newData;
  }

  _onCommentKeydown(event) {
    if (event.ctrlKey && event.keyCode === 13) {
      const newData = this._getNewData();
      this._onUserCommentSend(newData);
    }
  }
  _onUserRatingClick(event) {
    if (event.target.classList.contains(`film-details__user-rating-input`)) {
      const newData = this._getNewData();
      this._onUserRatingChange(newData);
    }
  }

  set onUserRatingChange(func) {
    if (typeof func === `function`) {
      this._onUserRatingChange = func;
    }
  }
  set onUserCommentSend(func) {
    if (typeof func === `function`) {
      this._onUserCommentSend = func;
    }
  }

  _createMapper(target) {
    return {
      'score': (value) => (target.userRating = value),
      'comment': (value) => (target.userComments = value),
      'comment-emoji': (value) => (target.userEmoji = value),
      'watchlist': () => (target.userState.isWatchlist = true),
      'watched': () => (target.userState.isWatched = true),
      'favorite': () => (target.userState.isFavorite = true)
    };
  }

  _processForm(data) {
    const entry = {
      userRating: ``,
      userComments: ``,
      userEmoji: ``,
      userState: {}
    };

    const filmDetalisMapper = this._createMapper(entry);

    for (const pair of data.entries()) {
      const [property, value] = pair;
      if (filmDetalisMapper[property]) {
        filmDetalisMapper[property](value);
      }
    }

    return entry;
  }

  get template() {
    return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._image}" alt="incredables-2">
            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: Невероятная семейка</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
                <p class="film-details__user-rating">Your rate ${this._userRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">Brad Bird</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Brad Bird</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">Samuel L. Jackson, Catherine Keener, Sophia Bush</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(this._timeStamp).format(`d MMMM Y`)} (USA)</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${Math.floor(moment.duration(this._runtime, `seconds`).asMinutes())} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                <span class="film-details__genre">${this._getGenre()}</span>
                <span class="film-details__genre">${this._getGenre()}</span>
                <span class="film-details__genre">${this._getGenre()}</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${this._description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._userState.isWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._userState.isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden"  id="favorite" name="favorite" ${this._userState.isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>

        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._userComments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${this._getUserComments()}
          </ul>

          <div class="film-details__new-comment">
            <div>
              <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
              <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

              <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
              <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
              <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
            </div>
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
          </label>
        </div>
      </section>

      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <span class="film-details__watched-status ${this._userState.isWatched ? `film-details__watched-status--active` : ``}">Already watched</span>
          <button class="film-details__watched-reset" type="button">undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${this._image}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${this._title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${this._userRating === `1` ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-1">1</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${this._userRating === `2` ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-2">2</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3"${this._userRating === `3` ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-3">3</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4"${this._userRating === `4` ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-4">4</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${this._userRating === `5` ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-5">5</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6"${this._userRating === `6` ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-6">6</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7"${this._userRating === `7` ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-7">7</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8"${this._userRating === `8` ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-8">8</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9"${this._userRating === `9` ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-9">9</label>

            </div>
          </section>
        </div>
      </section>
      </form>
    </section>`;
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__user-rating-score`).addEventListener(`click`, this._onUserRatingClick);
    this._element.querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._onEmojiClick);
    this._element.querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._onCommentKeydown);
    this._element.querySelector(`.film-details__watched-reset`).addEventListener(`click`, this._onWatchedResetButtonClick);
    this._element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._onWatchedButtonClick);
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__user-rating-score`).removeEventListener(`click`, this._onUserRatingClick);
    this._element.querySelector(`.film-details__emoji-list`).removeEventListener(`click`, this._onEmojiClick);
    this._element.querySelector(`.film-details__comment-input`).removeEventListener(`keydown`, this._onCommentKeydown);
    this._element.querySelector(`.film-details__watched-reset`).removeEventListener(`click`, this._onWatchedResetButtonClick);
    this._element.querySelector(`.film-details__control-label--watched`).removeEventListener(`click`, this._onWatchedButtonClick);
  }

  update(data) {
    this._userRating = data.userRating;
    this._userState = data.userState;
    if (data.userComments !== ``) {
      this._userComments.push(data.userComments);
      this._userEmoji.push(data.userEmoji);
      this._userCommentsDate.push(data.userCommentsDate);
    }
  }
}
