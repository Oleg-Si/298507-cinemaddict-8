import getRandomInt from '../src/get-random-integer.js';
import getRandomArrayElements from '../src/get-random-array-element.js';

const genre = new Set([
  `Horror`,
  `Comedy`,
  `Action`,
  `Adventure`,
  `Documentary`
]);

export default () => ({
  image: `//picsum.photos/230/340?r=${Math.random()}`,
  title: [`«Малхолланд Драйв»`, `«Белая лента»`, `«Нефть»`, `«Унесенные призраками»`, `«Отрочество»`, `«Вечное сияние чистого разума»`, `«Древо жизни»`, `«Один и два»`, `«Развод Надера и Симин»`, `«Внутри Льюина Дэвиса»`, `«Старикам тут не место»`, `«Лабиринт Фавна»`, `«Зодиак»`, `«Акт убийства»`, `«4 месяца, 3 недели и 2 дня»`][Math.floor(Math.random() * 15)],
  description: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`][Math.floor(Math.random() * 3)],
  rating: `${getRandomInt(0, 9)}.${getRandomInt(0, 9)}`,
  timeStamp: getRandomInt(1262293200000, 1552915226386),
  runtime: getRandomInt(1800, 7800),
  genre: getRandomArrayElements(genre, 3),
  userRating: `5`,
  userComments: [`So long-long story, boring!`],
  userCommentsDate: [`1552921169576`],
  userEmoji: [`neutral-face`],
  userState: {
    'isWatchlist': false,
    'isFavorite': false,
    'isWatched': false
  }
});
