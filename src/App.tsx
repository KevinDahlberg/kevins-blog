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
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Admin from "./admin";
import Home from "./home";
import { firebaseConfig } from "./env/firebase-config";
function App() {
  let history = useHistory();
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <Router>
        <Switch>
          <Route path="/admin">
            <IfFirebaseAuthed>
              {({ isSignedIn, user, providerId }) => {
                return <Admin />;
              }}
            </IfFirebaseAuthed>
            <IfFirebaseUnAuthed>
              {() => {
                return <div>Login</div>;
              }}
            </IfFirebaseUnAuthed>
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
