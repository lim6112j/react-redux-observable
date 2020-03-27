import { ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';
export const pingEpic = (action$: Observable<any>) => action$.pipe(
  ofType('PING'),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: 'PONG' })
);
const ping = (state = {isPinging: false}, action:any) => {
  switch (action.type) {
    case 'PING':
      console.log('PINGPING')
      return { isPinging: true };
    case 'PONG':
      console.log('PONGPONG')
      return { isPinging: false };
    default:
      return state;
  }
};
export default ping;