import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators/take';
import { multicast } from 'rxjs/operators/multicast';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AsyncSubject } from 'rxjs/AsyncSubject';

// const subject = new Subject();
// const subject = new BehaviorSubject(0);
// const subject = new ReplaySubject(Number.POSITIVE_INFINITY, 250); // 1000 - how long time ReplaySubject should store data

// ReplaySubject: replays many, before or after completion
// BehaviorSubject: replays one, only before completion
// AsyncSubject: replays one, only if completed

// const subject = new ReplaySubject(100); // analog BehaviorSubject subject - store only last value
// const subject = new AsyncSubject();

const connectableObservale = interval(1000).pipe(
  take(5),
  // multicast(new Subject()),
  multicast(new ReplaySubject(100)),
);

const observerA = {
  next: (x) => (console.log('A next ', x)),
  error: (err) => (console.log('A error ', err)),
  complete: () => (console.log('A done')),
};

const sub = connectableObservale.connect();

// subject.subscribe(observerA);
connectableObservale.subscribe(observerA);
console.log('observer A subscribed!');

const observerB = {
  next: (x) => (console.log('B next ', x)),
  error: (err) => (console.log('B error ', err)),
  complete: () => (console.log('B done')),
};

// observable.subscribe(subject);

// setTimeout(() => (subject.next(1)), 100);
// setTimeout(() => (subject.next(2)), 200);
// setTimeout(() => (subject.next(3)), 300);
// setTimeout(() => (subject.complete()), 350);

setTimeout(() => {
  // subject.subscribe(observerB);
  connectableObservale.subscribe(observerB);
  console.log('observer B subscribed!');
  // }, 400);
}, 2000);

setTimeout(() => {
  sub.unsubscribe();
  console.log('unsubscribe');
}, 5000);

// subject.error('error');
// setInterval(() => (subject.next(10)), 1000);
// setInterval(() => (subject.next(10)), 1000);
