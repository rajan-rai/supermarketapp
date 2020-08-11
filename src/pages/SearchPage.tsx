import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonRouterLink,
  IonList,
  IonInput,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonButton,
  IonRow,
  IonCol,
  IonIcon,
  IonBackButton,
} from '@ionic/react';
import React, { useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { entries } from '../data';
import { search } from 'ionicons/icons';

const SearchPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonHeader color="primary">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/home" />
          </IonButtons>
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {
            entries.map((entry) =>
              <IonItem button key={entry.id}
                routerLink={`/my/home/${entry.id}`}>
                {entry.title}
              </IonItem>
            )
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
