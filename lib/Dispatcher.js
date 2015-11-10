import Symbol from 'es6-symbol'
import { Dispatcher as _Dispatcher } from 'flux';

class Dispatcher extends _Dispatcher {

  dispatch(event, ...args) {
    if (!event) {
      throw new Error('You forgot to specify event.');
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(this.constructor.name, event);
    }

    super.dispatch({event, args: args});
  }

  dispatchAsync(promise, events, ...args) {
    const { request, success, failure } = events;

    dispatch(request, ...args);
    promise.then(
      response => dispatch(success, {...args, response}),
      error => dispatch(failure, {...args, error})
    );
  }

  emit(...args) {
    setTimeout(() => this.dispatch(...args), 0);
  }
}

Dispatcher.construct = function (a, e) {
  const m = new a();
  m.Events = e;
  return m;
};

export default Dispatcher