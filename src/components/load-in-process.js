import {createLoadInProgressTemplate} from '../templates/load-in-process';
import Component from './component';

export default class LoadInProcessComponent extends Component {
  get template() {
    return createLoadInProgressTemplate();
  }
}
