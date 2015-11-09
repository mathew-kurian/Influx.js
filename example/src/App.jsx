import Influx from '../../index.js'
import Store from './Store'
import Dispatcher from './Dispatcher'
import keyMirror from 'keyMirror'

class App extends Influx.Component {
  constructor(...args) {
    super(...args);
    const count = Store.getCount();
    this.state = {count};
  }

  getListeners() {
    return [
      [Dispatcher, Dispatcher.Events.ALERT, '_onAlert'],
      [Store, Store.Events.UPDATED, this._onIncrement]
    ]
  }

  _onAlert(message) {
    alert(message);
  }

  _onIncrement(count) {
    // Store.getCount() === count
    this.setState({count});
  }

  render() {
    return (
      <div>
        <h5>Component ▶ Dispatcher ▶ Store ▶ Component</h5>
        <div>{this.state.count}</div>
        <button onClick={()=>Dispatcher.emit(Dispatcher.Events.INCREMENT)}>Dispatch INCREMENT</button>
        <br />
        <h5>Component ▶ Dispatcher ▶ Component</h5>
        <div>{this.state.message}</div>
        <button onClick={()=>Dispatcher.emit(Dispatcher.Events.ALERT, "Whatsup!")}>Dispatch ALERT</button>
      </div>
    )
  }
}

export default App