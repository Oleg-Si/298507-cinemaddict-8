import getRandomInt from '../src/get-random-integer.js';

export default () => ({
  image: `//picsum.photos/230/340?r=${Math.random()}`,
  title: [`«Малхолланд Драйв»`, `«Белая лента»`, `«Нефть»`, `«Унесенные призраками»`, `«Отрочество»`, `«Вечное сияние чистого разума»`, `«Древо жизни»`, `«Один и два»`, `«Развод Надера и Симин»`, `«Внутри Льюина Дэвиса»`, `«Старикам тут не место»`, `«Лабиринт Фавна»`, `«Зодиак»`, `«Акт убийства»`, `«4 месяца, 3 недели и 2 дня»`][Math.floor(Math.random() * 15)],
  description: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`][Math.floor(Math.random() * 3)],
  rating: `${getRandomInt(0, 9)}.${getRandomInt(0, 9)}`,
  year: new Set([
    `2015`,
    `2016`,
    `2017`,
    `2018`,
    `2019`,
  ]),
  time: getRandomInt(1000, 8500),
  genre: new Set([
    `Horror`,
    `Comedy`,
    `Action`,
    `Adventure`,
    `Documentary`
  ]),
  comments: getRandomInt(0, 45)
});
