import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import React, { useState, useCallback, useEffect } from 'react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import { useAuth } from '../auth';
import { RefresherEventDetail } from '@ionic/core';
import { Redirect } from 'react-router';

const HomePage: React.FC = () => {
  const { loggedIn }= useAuth();
  const [searchText, setSearchText] = useState('');
  const [searchPage, setSearchPage] = useState(false);

  if(searchPage)
  {
    return <Redirect to="/my/search" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Garg Supermarket</IonTitle>
        </IonToolbar>
        <IonButtons>
          <IonButton>Category</IonButton>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Filter more than 1000 products" onIonFocus={(event) => setSearchPage(true)}></IonSearchbar>
        </IonButtons>
      </IonHeader>
      <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          <IonCardTitle>Card Title</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonItem>
          <IonIcon icon={pin} slot="start" />
          <IonLabel>ion-item in a card, icon left, button right</IonLabel>
          <IonButton fill="outline" slot="end">View</IonButton>
        </IonItem>
        <IonCardContent>
          This is content, without any paragraph or header tags,
          within an ion-cardContent element.
        </IonCardContent>
      </IonCard>
        <IonCard>
          <IonItem href="#" className="ion-activated">
            <IonIcon icon={wifi} slot="start" />
            <IonLabel>Card Link Item 1 activated</IonLabel>
          </IonItem>
          <IonItem href="#">
            <IonIcon icon={wine} slot="start" />
            <IonLabel>Card Link Item 2</IonLabel>
          </IonItem>
          <IonItem className="ion-activated">
            <IonIcon icon={warning} slot="start" />
            <IonLabel>Card Button Item 1 activated</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={walk} slot="start" />
            <IonLabel>Card Button Item 2</IonLabel>
          </IonItem>
        </IonCard>
        
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonCard>

              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard>
                <IonItem>
                  <IonLabel>Comapny Name</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Product Name</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>127g</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>MRP. Rs 196</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Rs 125</IonLabel>
                  <IonButton color="danger">Add</IonButton>
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
