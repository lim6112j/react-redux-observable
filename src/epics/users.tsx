import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
// action creators
const fetchUserFulfilled = (payload: unknown) => ({ type: 'FETCH_USER_FULFILLED', payload });

export const fetchUserEpic = (action$: Observable<any>) => action$.pipe(
  ofType('FETCH_USER'),
  mergeMap(action =>
    ajax.getJSON(`https://randomuser.me/api/?results=5&seed=rx-react&nat=us&inc=name&noinfo`).pipe(
      map(response => fetchUserFulfilled(response))
    )
  )
);
const users = (state = {}, action:any) => {
  switch (action.type) {
    case 'FETCH_USER_FULFILLED':
      console.log('fetch_user_fulfilled triggered');
      // console.log(action.payload.results[0].name);
      action.payload.login = 'user';
      return {
        ...state,
        // `login` is the username
        [action.payload.login]: action.payload
      };

    default:
      return state;
  }
};
export default users;