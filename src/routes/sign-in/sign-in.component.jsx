import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
// import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'


import SignUpForm from "../../components/sign-up/sign-up.component";

const SignIn = () => {
  useEffect(async () => {
    const response = await getRedirectResult(auth);
    // console.log(response);
  }, []);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);

    const logGoogleRedirectUser = async () => {
      const { user } = await signInWithGoogleRedirect();
      console.table({ user });
    };
  };

  return (
    <div>
      <button onClick={logGoogleUser}>hata malmo</button>
      <button onClick={signInWithGoogleRedirect}>hata dik</button>
	  <SignUpForm/>
    </div>
  );
};

export default SignIn;
