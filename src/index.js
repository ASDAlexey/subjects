import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators/take';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// const subject = new Subject();
const subject = new BehaviorSubject(0);

const observerA = {
  next: (x) => (console.log('A next ', x)),
  error: (err) => (console.log('A error ', err)),
  complete: () => (console.log('A done')),
};
subject.subscribe(observerA);
console.log('observer A subscribed!');

const observerB = {
  next: (x) => (console.log('B next ', x)),
  error: (err) => (console.log('B error ', err)),
  complete: () => (console.log('B done')),
};

subject.next(1);
subject.next(2);
subject.next(3);

setTimeout(() => {
  subject.subscribe(observerB);
  console.log('observer B subscribed!');
}, 2000);

// subject.error('error');
// setInterval(() => (subject.next(10)), 1000);
// setInterval(() => (subject.next(10)), 1000);
