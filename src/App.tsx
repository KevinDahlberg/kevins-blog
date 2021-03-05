import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  Redirect,
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Admin from "./admin";
import Home from "./home";
import { firebaseConfig } from "./env/firebase-config";
import Login from "./auth/login";
import { Provider } from "react-redux";
import store from "./store";
import Session from "./auth/session";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

function App() {
  let history = useHistory();
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          console.log("isSignedIn", isSignedIn, "user", user);
        }}
      </FirebaseAuthConsumer>
      <Router>
        <Switch>
          <Route path="/admin">
            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                return (
                  <React.Fragment>
                    <IfFirebaseAuthed>
                      {({ isSignedIn, user, providerId }) => {
                        console.log("signedIn", isSignedIn, "user", user);
                        return <Admin />;
                      }}
                    </IfFirebaseAuthed>

                    <IfFirebaseUnAuthed>
                      {() => {
                        return <Redirect to="/session/login" />;
                      }}
                    </IfFirebaseUnAuthed>
                  </React.Fragment>
                );
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
