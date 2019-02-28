export default (argumentsList) => {

  const template = `<a href="${argumentsList.href}" class="main-navigation__item  ${argumentsList.checked ? `main-navigation__item--active` : ``} ${argumentsList.additional ? `main-navigation__item--additional` : ``}">${argumentsList.name} ${(argumentsList.count > 0) ? `<span class="main-navigation__item-count">${argumentsList.count}</span>` : ``}</a>`;

  const element = document.createElement(`template`);
  element.innerHTML = template;

  return element.content;
};
