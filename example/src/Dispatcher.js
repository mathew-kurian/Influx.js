import Influx from '../../index.js'
import keyMirror from 'keyMirror'

const Events = keyMirror({
  INCREMENT: null,
  ALERT: null
});

class Dispatcher extends Influx.Dispatcher {
  // override as needed
}

export default Dispatcher.construct(Dispatcher, Events)