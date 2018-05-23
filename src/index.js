import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators/take';
import { Subject } from 'rxjs/Subject';

const subject = new Subject();

const observerA = {
  next: (x) => (console.log('A next ', x)),
  error: (err) => (console.log('A error ', err)),
  complete: () => (console.log('A done')),
};
subject.subscribe(observerA);

const observerB = {
  next: (x) => (console.log('B next ', x)),
  error: (err) => (console.log('B error ', err)),
  complete: () => (console.log('B done')),
};
setTimeout(() => (subject.subscribe(observerB)), 2000);

subject.next(1);
subject.next(2);
subject.next(3);

// subject.error('error');
// setInterval(() => (subject.next(10)), 1000);
