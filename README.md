# Influx.js
ES6 React 0.14 Component, Dispatcher, Store communication

```
npm install react-influx
```

### Dispatcher.js
```jsx
const Events = keyMirror({
  INCREMENT: null,
  ALERT: null
});

class Dispatcher extends Influx.Dispatcher {
  // override as needed
}

export default Dispatcher.construct(Dispatcher, Events)
```

### App.jsx
```jsx
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
```

### Store.js
```jsx
const Events = keyMirror({
  UPDATED: null
});

class Store extends Influx.Store {
  constructor(...args) {
    super(Dispatcher/*,  additional dispatchers you have */);
    this.data = {count: 0};
    this.className = this.constructor.name;
  }

  getCount() {
    return this.data.count;
  }

  getDispatcherListeners() {
    return [
      [Dispatcher, Dispatcher.Events.INCREMENT, '_onDispatcherIncrement'],
      [Dispatcher, Dispatcher.Events.ALERT, this._onDispatcherAlert]
    ]
  }

  _onDispatcherIncrement() {
    this.data.count++;
    this.emit(Events.UPDATED, this.data.count);
  }

  _onDispatcherAlert(message) {
    console.log(message);
  }

  onAction(event, arg0) {
    switch (event) {
      case Dispatcher.Events.INCREMENT:
      case Dispatcher.Events.ALERT:
      default:
        console.info(this.className, "onAction", event, arg0);
    }
  }
}

export default Store.construct(Store, Events)
```
