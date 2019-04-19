import Adapter from '../src/data-adapter.js';

const URL = `movies`;
const SYNC_URL = `movies/sync`;

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`
};

const toJSON = (response) => response.json();

export default class API {
  constructor(baseUrl, authorization) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  getData() {
    return this._load({
      url: URL
    })
      .then(toJSON)
      .then(Adapter.parseData);
  }

  updateData({id, data}) {
    return this._load({
      url: `${URL}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(Adapter.parseDataItem);
  }

  syncData({data}) {
    return this._load({
      url: SYNC_URL,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._baseUrl}/${url}`, {method, body, headers})
      .then(API.checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
