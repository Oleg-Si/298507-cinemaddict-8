import makeFilter from '../src/make-filter.js';
import getRandomInt from '../src/get-random-integer.js';
import cardTemplate from '../src/card-template.js';
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

const renderCard = (count) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const element = document.createElement(`article`);
    element.classList.add(`film-card`);
    element.innerHTML = cardTemplate(getCardData());

    fragment.appendChild(element);
  }

  return fragment;
};

const mainFilmsLabel = document.querySelector(`.films-list .films-list__container`);

mainFilmsLabel.appendChild(renderCard(7));

const extraFilmsLabels = document.querySelectorAll(`.films-list--extra .films-list__container`);
extraFilmsLabels.forEach((el) => {
  el.appendChild(renderCard(2));
});

const filters = document.querySelectorAll(`.main-navigation a`);
filters.forEach((el) => {
  el.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    mainFilmsLabel.innerHTML = ``;
    mainFilmsLabel.appendChild(renderCard(getRandomInt(1, 5)));
  });
});
