import firebase from 'firebase';

export function login(email: string, password: string) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.error('unable to sign in', error);
    });
}

export function register(email: string, password: string) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log('unable to register', error);
    });
}
