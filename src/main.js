import makeFilter from '../src/make-filter.js';
import getRandomInt from '../src/get-random-integer.js';
import FilmCard from '../src/film-card.js';
import FilmDetalis from '../src/film-detalis.js';
//import cardTemplate from '../src/card-template.js';
import getCardData from '../src/get-card-data.js';

const mainNavigationField = document.querySelector(`.main-navigation`);

const filtersArguments = [
  {
    name: `All movies`,
    href: `#all`,
    count: 0,
    checked: true,
    additional: false
  },
  {
    name: `Watchlist`,
    href: `#watchlist`,
    count: 13,
    checked: false,
    additional: false
  },
  {
    name: `History`,
    href: `#history`,
    count: 4,
    checked: false,
    additional: false
  },
  {
    name: `Favorites`,
    href: `#favorites`,
    count: 8,
    checked: false,
    additional: false
  },
  {
    name: `Stats`,
    href: `#stats`,
    count: 0,
    checked: false,
    additional: true
  }
];

const filtersContent = document.createDocumentFragment();

filtersArguments.forEach((el) => {
  filtersContent.appendChild(makeFilter(el));
});
mainNavigationField.appendChild(filtersContent);

const createCards = (count) => {
  const allCard = [];
  for (let i = 0; i < count; i++) {
    allCard.push(new FilmCard(getCardData()));
  }
  return allCard;
};

const createListener = () => {
  new FilmDetalis(getCardData()).render(body)
}

const mainFilmsLabel = document.querySelector(`.films-list .films-list__container`);
const body = document.querySelector(`body`);

const renderCards = (cards) => {
  const fragment = document.createDocumentFragment();
  for (const card of cards) {
    card.render(fragment, createListener);
  }

  return fragment;
};

mainFilmsLabel.appendChild(renderCards(createCards(7)));

const extraFilmsLabels = document.querySelectorAll(`.films-list--extra .films-list__container`);
extraFilmsLabels.forEach((el) => {
  el.appendChild(renderCards(createCards(2)));
});

const filters = document.querySelectorAll(`.main-navigation a`);
filters.forEach((el) => {
  el.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    mainFilmsLabel.innerHTML = ``;
    mainFilmsLabel.appendChild(renderCards(createCards(getRandomInt(1, 5))));
  });
});
