import makeFilter from '../src/make-filter.js';
import getRandomInt from '../src/get-random-integer.js';
import cardTemplate from '../src/card-template.js';

const mainNavigationField = document.querySelector(`.main-navigation`);

mainNavigationField.appendChild(makeFilter(`All movies`, `#all`, 0, true));
mainNavigationField.appendChild(makeFilter(`Watchlist`, `#watchlist`, 13));
mainNavigationField.appendChild(makeFilter(`History`, `#history`, 4));
mainNavigationField.appendChild(makeFilter(`Favorites`, `#favorites`, 8));
mainNavigationField.appendChild(makeFilter(`Stats`, `#stats`, 0, false, true));

const renderCard = (count) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const element = document.createElement(`article`);
    element.classList.add(`film-card`);
    element.innerHTML = cardTemplate;

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
