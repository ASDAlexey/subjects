import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators/take';

const observable = interval(1000).pipe(take(5));
const observerA = {
  next: (x) => (console.log('A next ', x)),
  error: (err) => (console.log('A error ', err)),
  complete: () => (console.log('A done')),
};
observable.subscribe(observerA);

const observerB = {
  next: (x) => (console.log('B next ', x)),
  error: (err) => (console.log('B error ', err)),
  complete: () => (console.log('B done')),
};

setTimeout(() => {
  observable.subscribe(observerB);
}, 2000);
