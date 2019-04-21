const MILLISECONDS_AMOUNT = 1000;
const SECONDS_AMOUNT = 60;
const NUMERAL_SYSTEM_VALUE = 10;

export default class CardModel {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.rating = data[`film_info`][`total_rating`];
    this.year = data[`film_info`][`release`][`date`];
    this.duration = data[`film_info`][`runtime`] * MILLISECONDS_AMOUNT * SECONDS_AMOUNT;
    if (data[`film_info`][`genre`].length) {
      this.genre = data[`film_info`][`genre`];
    } else {
      this.genre = [`No genre`];
    }
    this.image = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.commentsAmount = data[`comments`].length;
    this.userDate = data[`user_details`][`watching_date`];
    this.isOnWatchlist = data[`user_details`][`watchlist`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.popup = {
      director: data[`film_info`][`director`],
      writers: data[`film_info`][`writers`],
      actors: data[`film_info`][`actors`],
      releaseDay: data[`film_info`][`release`][`date`],
      runtime: data[`film_info`][`runtime`] * MILLISECONDS_AMOUNT * SECONDS_AMOUNT,
      country: data[`film_info`][`release`][`release_country`],
      genres: this.genre,
      ageLimit: data[`film_info`][`age_rating`],
      original: data[`film_info`][`alternative_title`],
      yourRating: data[`user_details`][`personal_rating`].toString(),
      commentsList: data[`comments`]
    };
  }

  static toRAW(data) {
    return {
      'id': data.id,
      'comments': data.popup.commentsList,
      'film_info': {
        'actors': data.popup.actors,
        'age_rating': data.popup.ageLimit,
        'alternative_title': data.popup.original,
        'description': data.description,
        'director': data.popup.director,
        'genre': data.genre,
        'poster': data.image,
        'release': {
          'date': data.popup.releaseDay,
          'release_country': data.popup.country
        },
        'runtime': data.duration / MILLISECONDS_AMOUNT / SECONDS_AMOUNT,
        'title': data.title,
        'total_rating': data.rating,
        'writers': data.popup.writers
      },
      'user_details': {
        'already_watched': data.isWatched,
        'favorite': data.isFavorite,
        'personal_rating': parseInt(data.popup.yourRating, NUMERAL_SYSTEM_VALUE),
        'watching_date': data.userDate,
        'watchlist': data.isOnWatchlist
      }
    };
  }

  static parseDatum(data) {
    return new CardModel(data);
  }

  static parseData(data) {
    return data.map(CardModel.parseDatum);
  }
}
