import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
	const userDocRef = await createUserDocumentFromAuth(user)
  };

  return (
    <div>
      <button onClick={logGoogleUser}>hata malmo</button>
    </div>
  );
};

export default SignIn;
