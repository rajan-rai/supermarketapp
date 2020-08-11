import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import HomePage from './pages/HomePage';
import { AuthContext } from  './auth';
import NotFoundPage from './pages/NotFoundPage';
import Menu from './components/Menu';
import SearchPage from './pages/SearchPage';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const PrivateAppRouting: React.FC = () => {
  const { loggedIn } = useContext(AuthContext);
  if(!loggedIn)
  {
    return <Redirect to="/login" />
  }
  return (
    <IonSplitPane contentId="main">
      <Menu />      
      <IonRouterOutlet id="main">
        <Route exact path="/my/home">
          <HomePage />
        </Route>
        <Route exact path="/my/search">
          <SearchPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </IonRouterOutlet>      
    </IonSplitPane>
  );
};

export default PrivateAppRouting;
