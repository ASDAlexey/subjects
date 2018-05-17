import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators/take';

const observable = interval(1000).pipe(take(5));

const observerA = {
  next: (x) => (console.log('A next ', x)),
  error: (err) => (console.log('A error ', err)),
  complete: () => (console.log('A done')),
};

const observerB = {
  next: (x) => (console.log('B next ', x)),
  error: (err) => (console.log('B error ', err)),
  complete: () => (console.log('B done')),
};

const bridgeObserver = {
  observers: [],
  next: function (x) {
    this.observers.forEach((o) => o.next(x));
  },
  error: function (err) {
    this.observers.forEach((o) => o.error(err));
  },
  complete: function (err) {
    this.observers.forEach((o) => o.complete());
  },
  subscribe: function (observer) {
    this.observers.push(observer);
  },
};

bridgeObserver.subscribe(observerA);
observable.subscribe(bridgeObserver);
// observable.subscribe(observerA);

setTimeout(() => {
  bridgeObserver.subscribe(observerB);
}, 2000);
