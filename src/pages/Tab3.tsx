import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonText, IonItem, IonList, IonButton } from '@ionic/react';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { fetchUser } from '../actions';

// import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const reducer = (state: any, action: { type: any; payload: any;}) => {
  switch(action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}
// local state using rxjs.
const useObservable = (observable: Observable<any>) => {
  const [state, setState] = useState();
  useEffect(() => {
    const subs = observable.subscribe(setState);
    return () => subs.unsubscribe();
  }, [observable]);
  // console.log(state);
  return state;
}
const source = ['Adam', 'Brian', 'Christine'];
// const names$ = of(source);
// const names$ = interval(1000).pipe(map(i => {
//   return source.slice(0, i + 1);
// }));
const api = `https://randomuser.me/api/?results=5&seed=rx-react&nat=us&inc=name&noinfo`;
const getName = (user: any) => `${user.name.first} ${user.name.last}`;
const names$ = ajax.getJSON(api).pipe(map(
  (results:any) => {
    // console.log(results.results.map((user: any) => getName(user)));
    return results.results.map(getName);
  }
  ));
const Tab3: React.FC = (props) => {
  const state: any = useObservable(names$) || []; // state is undefined untill observable emits value, if state if undefined, return []
  const initialValue = {count: 0};
// normal local reducer
  const [value, dispatch] = useReducer(reducer, initialValue);
// rxjs epic global reducer using redux-observable
  const  dispatchrx = useDispatch();
  const selector = useSelector((state:any) => state);
  console.log(selector.users.user)


  const listItems = state.map((item: string, i: number) => 
    <IonItem key={i}>{item}</IonItem>
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Test Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Test Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
  <IonText>{value.count} {selector.ping.isPinging? 'ping true': 'ping false'}</IonText>
            </IonCol>
            <IonCol>
  <IonText>{JSON.stringify(selector.users.user)}</IonText>
            </IonCol>
            <IonButton onClick={() => dispatch({type: 'increment', payload: ''})}>inc</IonButton>
            <IonButton onClick={() => dispatch({type: 'decrement', payload: ''})}>dec</IonButton>
            <IonButton onClick={() => dispatchrx({type: 'PING'})}>PING</IonButton>
            <IonButton onClick={() => dispatchrx(fetchUser('lim ben'))}>fetch</IonButton>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                RxJS with React
              </IonText>
              <IonList>
                {listItems}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* <ExploreContainer name="Code Test page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
