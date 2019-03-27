import Filter from '../src/filter.js';
import FilterStatistic from '../src/filter-statistic.js';
import FilmCard from '../src/film-card.js';
import FilmDetalis from '../src/film-detalis.js';
import getCardData from '../src/get-card-data.js';
import getFilterData from '../src/get-filter-data.js';
import getFilterStatisticData from '../src/get-filter-statistic-data.js';
import Statistic from '../src/statistic.js';

const mainNavigationField = document.querySelector(`.main-navigation`);
const mainFilmsLabel = document.querySelector(`.films-list .films-list__container`);
const main = document.querySelector(`main`);

const createCards = (count) => {
  const allCard = [];
  for (let i = 0; i < count; i++) {
    allCard.push(getCardData());
  }
  return allCard;
};
const allCards = createCards(7);

const clearFilterCheckedStatus = () => {
  const allFilter = document.querySelectorAll(`.main-navigation__item`);
  for (const filter of allFilter) {
    filter.classList.remove(`main-navigation__item--active`);
  }
};
const getUserStatisticData = () => {
  const userWatchedCard = allCards.filter((el) => el.userState.isWatched);

  return userWatchedCard;
};

const createFilterMarkdown = (allFilters) => {
  const fragment = document.createDocumentFragment();
  for (const filter of allFilters) {
    const newFilter = new Filter(filter);

    newFilter.onClick = () => {

      if (document.querySelector(`.statistic`)) {
        document.querySelector(`.films`).classList.remove(`visually-hidden`);
        document.querySelector(`.statistic`).classList.add(`visually-hidden`);
      }

      mainFilmsLabel.innerHTML = ``;
      clearFilterCheckedStatus();

      const cardsWatchlist = [];
      const cardsHistory = [];
      const cardsFavorites = [];

      for (const card of allCards) {
        if (card.userState.isWatchlist) {
          cardsWatchlist.push(card);
        }
        if (card.userState.isWatched) {
          cardsHistory.push(card);
        }
        if (card.userState.isFavorite) {
          cardsFavorites.push(card);
        }
      }

      if (filter.name === `All movies`) {
        mainFilmsLabel.appendChild(createFilmMarkdown(allCards));
      }
      if (filter.name === `Watchlist`) {
        mainFilmsLabel.appendChild(createFilmMarkdown(cardsWatchlist));
      }
      if (filter.name === `Favorites`) {
        mainFilmsLabel.appendChild(createFilmMarkdown(cardsFavorites));
      }
      if (filter.name === `History`) {
        mainFilmsLabel.appendChild(createFilmMarkdown(cardsHistory));
      }
    };

    fragment.appendChild(newFilter.render());
  }

  return fragment;
};

const createFilterStatisticMarkdown = (allFilters) => {
  const fragment = document.createDocumentFragment();
  for (const filter of allFilters) {
    const newFilterStatistic = new FilterStatistic(filter);
    let newStatistic = null;

    newFilterStatistic.onClick = () => {
      clearFilterCheckedStatus();
      if (newStatistic === null) {
        newStatistic = new Statistic(getUserStatisticData());
      }

      const oldStatistic = newStatistic.element;

      if (!oldStatistic) {
        main.appendChild(newStatistic.render());
      } else {
        newStatistic.unrender();
        newStatistic.update(getUserStatisticData());
        main.replaceChild(newStatistic.render(), oldStatistic);
      }

      document.querySelector(`.films`).classList.add(`visually-hidden`);
      document.querySelector(`.statistic`).classList.remove(`visually-hidden`);

      newStatistic.setData();
    };

    fragment.appendChild(newFilterStatistic.render());
  }

  return fragment;
};

mainNavigationField.appendChild(createFilterMarkdown(getFilterData()));
mainNavigationField.appendChild(createFilterStatisticMarkdown(getFilterStatisticData()));

const body = document.querySelector(`body`);

const createFilmMarkdown = (data) => {
  const fragment = document.createDocumentFragment();
  for (const card of data) {
    const newFilm = new FilmCard(card);
    const newFilmDetalis = new FilmDetalis(card);

    newFilm.onClick = () => {
      body.appendChild(newFilmDetalis.render());
    };
    newFilm.onAddToWatchList = (event) => {
      event.preventDefault();
      card.userState.isWatchlist = !card.userState.isWatchlist;
    };
    newFilm.onAddToFavorites = (event) => {
      event.preventDefault();
      card.userState.isFavorite = !card.userState.isFavorite;
    };
    newFilm.onMarkAsWatched = (event) => {
      event.preventDefault();
      card.userState.isWatched = !card.userState.isWatched;
    };
    newFilmDetalis.onClick = () => {
      body.removeChild(newFilmDetalis.element);
      newFilmDetalis.unrender();
    };
    newFilmDetalis.onUserRatingChange = (newData) => {
      Object.assign(card, newData);
      newFilmDetalis.update(card);

      let oldFilmCard = newFilm.element;
      newFilm.unrender();
      newFilm.render();
      mainFilmsLabel.replaceChild(newFilm.element, oldFilmCard);
      oldFilmCard = null;

      body.removeChild(newFilmDetalis.element);
      newFilmDetalis.unrender();
    };
    newFilmDetalis.onUserCommentSend = (newData) => {
      Object.assign(card, newData);
      newFilmDetalis.update(card);

      let oldFilmCard = newFilm.element;
      newFilm.unrender();
      newFilm.render();
      mainFilmsLabel.replaceChild(newFilm.element, oldFilmCard);
      oldFilmCard = null;

      body.removeChild(newFilmDetalis.element);
      newFilmDetalis.unrender();
    };

    fragment.appendChild(newFilm.render());
  }

  return fragment;
};

mainFilmsLabel.appendChild(createFilmMarkdown(allCards));

const extraFilmsLabels = document.querySelectorAll(`.films-list--extra .films-list__container`);
extraFilmsLabels.forEach((el) => {
  el.appendChild(createFilmMarkdown(createCards(2)));
});
