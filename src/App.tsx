import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import PrivateAppRouting from './PrivateAppRouting';
import NotFoundPage from './pages/NotFoundPage';
import { AuthContext } from './auth';

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
import { auth as firebaseAuth } from './firebase';

const App: React.FC = () => {
  const [authState, setAuthState] = useState({ loading: true, loggedIn: false});
  //Run once on reload not on rendering
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setAuthState({ loading: false, loggedIn: Boolean(user) });
    });
  }, [])
  
  if(authState.loading)
  {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn: authState.loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route path="/my">
              <PrivateAppRouting />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
