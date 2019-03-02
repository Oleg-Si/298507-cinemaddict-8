export default (dataObj) => {
  const year = [...dataObj.year][Math.floor(Math.random() * 5)];
  const genre = [...dataObj.genre][Math.floor(Math.random() * 5)];

  const formatTime = (seconds) => {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);

    return `${hour}h ${minute}m`;
  };

  const template = `<h3 class="film-card__title">${dataObj.title}</h3>
  <p class="film-card__rating">${dataObj.rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
<span class="film-card__duration">${formatTime(dataObj.time)}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${dataObj.image}" alt="" class="film-card__poster">
  <p class="film-card__description">${dataObj.description}</p>
  <button class="film-card__comments">${dataObj.comments} comments</button>

  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
  </form>`;

  return template;
};
