import moment from 'moment';

const controls = [
  {
    modifier: `add-to-watchlist`,
    title: `WL`
  },
  {
    modifier: `mark-as-watched`,
    title: `WTCCHD`
  },
  {
    modifier: `favorite`,
    title: `FAV`
  },
];

const createFormTemplate = () => (
  `<form class="film-card__controls">
    ${controls.map((control) => (
    `<button class="film-card__controls-item button film-card__controls-item--${control.modifier}">${control.title}</button>`
  )).join(``)}
  </form>`
);

const getDurationFromMins = (min) => {
  return Math.trunc(min / 60) + `h` + ` ` + (min % 60) + `m`;
};

export const createCardTemplate = (data, options) => (
  `<article class="film-card ${!options.controls ? `film-card--no-controls` : ``} ">
    <h3 class="film-card__title">${data.title}</h3></br>
    <p class="film-card__rating">${data.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(data.year).format('Y')}</span>
      <span class="film-card__duration">${getDurationFromMins(Math.round(moment.duration(data.duration).asMinutes()))}</span>
    </p>
    <img src="${data.image}" alt="" class="film-card__poster">
    <p class="film-card__description">${data.description}</p>
    <button class="film-card__comments">${data.commentsAmount} comments</button>
    ${options.controls ? createFormTemplate() : ``}
  </article>`
);

export const createCardsSectionTemplate = () => (
  `<div class="films-list__container">

  </div>`
);

export const createCardsSectionsTemplate = () => (
  `<section class="films">
    <section class="films-list" id="films-main-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <button class="films-list__show-more">Show more</button>
    </section>

    <section class="films-list--extra" id="films-rated-list">
      <h2 class="films-list__title">Top rated</h2>

    </section>

    <section class="films-list--extra" id="films-commented-list">
      <h2 class="films-list__title">Most commented</h2>

    </section>
  </section>`
);
