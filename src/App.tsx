import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from '@react-firebase/auth';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import Admin from './admin';
import Home from './home';
import { firebaseConfig } from './env/firebase-config';
import Session from './auth/session';

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

function App() {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <Router>
        <Switch>
          <Route path="/admin">
            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                if (providerId === 'password' && isSignedIn) {
                  return (
                    <IfFirebaseAuthed>
                      {({ isSignedIn, user, providerId }) => {
                        return <Admin />;
                      }}
                    </IfFirebaseAuthed>
                  );
                }
                if (providerId === 'none' && !isSignedIn) {
                  return (
                    <React.Fragment>
                      <IfFirebaseUnAuthed>
                        {() => {
                          return <Redirect to="/session/login" />;
                        }}
                      </IfFirebaseUnAuthed>
                    </React.Fragment>
                  );
                }
              }}
            </FirebaseAuthConsumer>
          </Route>
          <Route path="/session">
            <Session />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </FirebaseAuthProvider>
  );
}

export default App;
