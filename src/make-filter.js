export default (name, href, count, active = false, additional = false) => {

  const template = `<a href="${href}" class="main-navigation__item  ${active ? `main-navigation__item--active` : ``} ${additional ? `main-navigation__item--additional` : ``}">${name} ${(count > 0) ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;

  const element = document.createElement(`template`);
  element.innerHTML = template;

  return element.content;
};
