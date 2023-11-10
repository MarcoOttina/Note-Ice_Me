import {
  // fromEvent,
  Observable,
  Subscriber,
  SchedulerLike,
  MonoTypeOperatorFunction,
  debounceTime,
  auditTime,
  throttleTime,
} from 'rxjs';

//

function log(v: number) {
  console.log('got value: ' + v);
}

/*
 */
type OP = (
  dueTime: number,
  scheduler?: SchedulerLike,
) => MonoTypeOperatorFunction<number>;
type OPData = {
  operation: OP;
  name: string;
  duration: number;
};

function new_test(
  eventOperator: OP,
  time: number,
  retrials: number | undefined = 5,
  intervalDelay: number | undefined = 512,
  consumer: ((value: number) => void) | undefined = undefined,
) {
  console.log(
    `creating the Observable (retrials: ${retrials}, delay: ${intervalDelay})`,
  );
  const o = new Observable<number>((subscriber: Subscriber<number>) => {
    const counter = [retrials];
    const myInterval = [null];

    myInterval[0] = setInterval(async () => {
      subscriber.next(counter[0]);
      console.log(`adding ${counter[0]}`);
      if (--counter[0] <= 0) {
        clearInterval(myInterval[0]);
        console.log('interval cleared');
      }
    }, intervalDelay);
  });
  o.pipe(eventOperator(time));
  console.log('subscribing ...');
  o.subscribe(consumer === undefined ? log : consumer);
}

const operations: OPData[] = [
  {
    operation: debounceTime,
    name: 'debounceTime',
    duration: 1400,
  },
  {
    operation: auditTime,
    name: 'auditTime',
    duration: 1400,
  },
  {
    operation: throttleTime,
    name: 'throttleTime',
    duration: 1400,
  },
];

/*
 */
console.log('starting everything');

const indexOperators = 1;
const iterations = 10;
const op = operations[indexOperators];
console.log(`START TEST of ${op.name}`);
new_test(op.operation, op.duration, iterations, 200);
console.log('END TEST');

console.log('da end');
