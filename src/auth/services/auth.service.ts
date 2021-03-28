import firebase from 'firebase';

export function login(
  email: string,
  password: string,
): Promise<void | firebase.auth.UserCredential> {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.error('unable to sign in', error);
    });
}

export function register(
  email: string,
  password: string,
): Promise<void | firebase.auth.UserCredential> {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.error('unable to register', error);
    });
}

export function authUser(): firebase.User | null {
  return firebase.auth().currentUser;
}
