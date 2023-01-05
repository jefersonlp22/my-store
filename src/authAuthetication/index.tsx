/*import { auth } from '~/firebase/config';

export function Authetication(email: string, password: string) {
  const { signInWithEmailAndPassword } = auth();
  signInWithEmailAndPassword(email, password)
    .then((data) => console.log('data', data))
    .catch((erro) => console.log('erro', erro));
}
*/

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export function Authetication(email: string, password: string) {
  const auth = getAuth();
  const login = signInWithEmailAndPassword(auth, email, password);
  /*.then((userCredential: any) => {
        const user = userCredential.user;
        console.log('user', user);
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode', errorCode);
        console.log('errorMessage', errorMessage);
      });
      */
  return login;
}
