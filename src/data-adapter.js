export default class Adapter {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`].title;
    this.timeStamp = data[`film_info`].release.date;
    this.rating = data[`film_info`].total_rating;
    this.image = data[`film_info`].poster;
    this.description = data[`film_info`].description;
    this.runtime = data[`film_info`].runtime;
    this.genre = data[`film_info`].genre;
    this.userDate = data[`user_details`][`watching_date`];
    this.userState = {
      'isWatchlist': Boolean(data[`user_details`].watchlist),
      'isFavorite': Boolean(data[`user_details`].favorite),
      'isWatched': Boolean(data[`user_details`].already_watched)
    }
    this.filmDetalis = {
      director: data[`film_info`].director,
      writers: data[`film_info`].writers,
      actors: data[`film_info`].actors,
      releaseDay: data[`film_info`][`release`][`date`],
      releaseCountry: data[`film_info`].release.release_country,
      ageRating: data[`film_info`].age_rating,
      alternativeTitle: data[`film_info`].alternative_title,
      userComments: data[`comments`],
      userRating: data[`user_details`].personal_rating
    }
  }

  toRAW(data) {
    return {
      'id': data.id,
      'comments': data.filmDetalis.userComments,
      'film_info': {
        'actors': data.filmDetalis.actors,
        'age_rating': data.filmDetalis.ageRating,
        'alternative_title': data.filmDetalis.alternativeTitle,
        'description': data.description,
        'director': data.filmDetalis.director,
        'genre': data.genre,
        'poster': data.image,
        'release': {
          date: data.timeStamp,
          release_country: data.filmDetalis.releaseCountry
        },
        'runtime': data.runtime,
        'title': data.title,
        'total_rating': data.rating,
        'writers': data.filmDetalis.writers
      },
      'user_details': {
        'already_watched': data.userState.isWatched,
        'favorite': data.userState.isFavorite,
        'personal_rating': data.filmDetalis.userRating,
        'watching_date': data.userDate,
        'watchlist': data.userState.isWatchlist
      }
    }
  }

  static parseDataItem(data) {
    return new Adapter(data);
  }

  static parseData(data) {
    return data.map(Adapter.parseDataItem);
  }
}
