import {getFilteredCards, setFiltersCounts} from './lib/filters';
import {setUserRank} from './lib/user-rank';
import FILTER_DATA from './data/filter';
import FiltersComponent from './components/filters';
import CardsSectionsComponent from './components/cards-sections';
import StatisticsComponent from './components/statistics';
import SearchComponent from './components/search';
import LoadInProcessComponent from './components/load-in-process';
import LoadErrorComponent from './components/load-error';
import API from './services/api';
import CardModel from './models/card-model';
import Provider from './services/provider';
import Store from './services/store';

const AUTHORIZATION = `Basic Olegoon_s9`;
const BASE_URL = ` https://es8-demo-srv.appspot.com/moowle`;
const DATA_STORE_KEY = `Olegoon_s9-key`;
const api = new API({
  baseUrl: BASE_URL,
  authorization: AUTHORIZATION
});
const store = new Store({key: DATA_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store});

const mainElement = document.querySelector(`main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const userRankElement = document.querySelector(`.profile__rating`);
const headerElement = document.querySelector(`.header`);
const searchReferenceElement = headerElement.querySelector(`.profile`);

const loadInProcessComponent = new LoadInProcessComponent();
const loadErrorComponent = new LoadErrorComponent();

let cardsList;
let filtersComponent;
let cardsSectionsComponent;
let statisticsComponent;
let searchComponent;

const updateCardsList = (updatedData, id) => {
  provider.updateData({id: updatedData.id, newData: CardModel.toRAW(updatedData)})
    .then((cardModel) => {
      const index = cardsList.findIndex((item) => item.id === id);
      if (index !== -1) {
        cardsList[index] = Object.assign({}, cardModel);
        setFiltersCounts(cardsList);
        userRankElement.innerHTML = setUserRank(cardsList.filter((card) => card.isWatched).length);
      }
    });
};

const onFilterSelect = (id) => {
  if (statisticsComponent) {
    statisticsComponent.unrender();
    mainElement.removeChild(mainElement.lastChild);
    addCards();
  }
  cardsSectionsComponent.update(getFilteredCards(cardsList)[id]());
  searchComponent.reset();
};

const addFilters = () => {
  filtersComponent = new FiltersComponent(FILTER_DATA);
  mainElement.insertBefore(filtersComponent.render(), mainElement.firstChild);
  filtersComponent.onSelect = onFilterSelect;
  setFiltersCounts(cardsList);
  document.querySelector(`#stats`).addEventListener(`click`, onStatsClick);
};

const updateCardData = (callback, id) => (cardModel) => {
  const index = cardsList.findIndex((item) => item.id === id);
  if (index !== -1) {
    cardsList[index] = Object.assign({}, cardModel);
    callback();
  }
};

const addCards = () => {
  cardsSectionsComponent = new CardsSectionsComponent(cardsList);
  mainElement.appendChild(cardsSectionsComponent.render());
  cardsSectionsComponent.onCardsChange = updateCardsList;

  cardsSectionsComponent.onCommentSubmit = (updatedData, id, popup) => {
    provider.updateData({id: updatedData.id, newData: CardModel.toRAW(updatedData)})
      .then(updateCardData(popup.enableCommentForm, id))
      .catch(popup.showCommentSubmitError);
  };

  cardsSectionsComponent.onRatingSubmit = (updatedData, id, popup) => {
    provider.updateData({id: updatedData.id, newData: CardModel.toRAW(updatedData)})
      .then(updateCardData(popup.showNewRating, id))
      .catch(popup.showRatingSubmitError);
  };
};

const onSearch = (value) => {
  if (value && cardsSectionsComponent._element) {
    cardsSectionsComponent.onSearch(value);
  } else if (cardsSectionsComponent._element) {
    cardsSectionsComponent.updateMainBlockElement();
  }
};

const addSearch = () => {
  searchComponent = new SearchComponent();
  headerElement.insertBefore(searchComponent.render(), searchReferenceElement);
  searchComponent.onSearch = onSearch;
};

const onStatsClick = () => {
  cardsSectionsComponent.unrender();
  mainElement.removeChild(mainElement.lastChild);
  statisticsComponent = new StatisticsComponent(cardsList);
  mainElement.appendChild(statisticsComponent.render());
  searchComponent.reset();
};

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncData();
});

mainElement.appendChild(loadInProcessComponent.render());
provider.getData()
  .then((data) => {
    cardsList = data;
    mainElement.removeChild(loadInProcessComponent.element);
    loadInProcessComponent.unrender();
    addCards();
    addFilters();
    footerStatisticsElement.innerHTML = `${cardsList.length} movies inside`;
    userRankElement.innerHTML = setUserRank(cardsList.filter((card) => card.isWatched).length);
  })
  .catch(() => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(loadErrorComponent.render());
  });

addSearch();
