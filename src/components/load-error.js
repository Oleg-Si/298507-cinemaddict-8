import {createLoadErrorTemplate} from '../templates/load-error';
import Component from './component';

export default class LoadErrorComponent extends Component {
  get template() {
    return createLoadErrorTemplate();
  }
}
