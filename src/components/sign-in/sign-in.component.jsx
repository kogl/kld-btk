import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";
import Button from "../button/button.component.jsx";

import { userContext } from "../../context/user.context";

const defaultFromFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(userContext);

  const clearFileds = () => {
    setFormFields(defaultFromFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      //   console.log(response);


      clearFileds();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("fel passworfd invalido ");
          break;
        case "auth/user-not-found":
          alert("user does not exist");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
    // console.log(formFields);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <h1>Sign in with email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
          type="email"
        />

        <FormInput
          label="Password"
          onChange={handleChange}
          name="password"
          value={password}
          required
          type="password"
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
