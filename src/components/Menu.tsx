import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { 
  bookmarkOutline,
  locationOutline,
  readerOutline,
  cartOutline,
  homeOutline,
  searchOutline,
} from 'ionicons/icons';
import './Menu.css';
import { auth } from '../firebase';

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/my/home',
    icon: homeOutline
  },
  {
    title: 'Search',
    url: '/my/search',
    icon: searchOutline
  },
  {
    title: 'Location',
    url: '/my/location',
    icon: locationOutline
  },
  {
    title: 'My Address',
    url: '/my/profile',
    icon: locationOutline
  },
  {
    title: 'My Orders',
    url: '/my/myorders',
    icon: readerOutline
  },
  {
    title: 'My Cart',
    url: '/my/mycart',
    icon: cartOutline
  }
];

const labels = ['Customer Support', 'Rate Us', 'Share', 'About Us','Sign Out'];

const Menu: React.FC = () => {
  const location = useLocation();

  const OthersListener = (label : string) =>{
    if(label === "Sign Out")
    {
      auth.signOut();
    }
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Welcome</IonListHeader>
          <IonNote>User Name</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Others</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
