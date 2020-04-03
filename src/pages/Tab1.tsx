// @flow
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonItem } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  const image = '../assets/logo.png';
  console.log('Currently running on ' + process.env.NODE_ENV + ' mode');
  console.log('socket endpoint => ', process.env.REACT_APP_SOCKET_ENDPOINT);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonImg src={image} />
          </IonItem>
          <IonTitle>TAB1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
