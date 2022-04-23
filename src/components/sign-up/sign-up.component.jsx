import { useState } from "react";
import { useDispatch } from "react-redux";


import FormInput from "../form-input/form-input.component";

// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";

// import { userContext } from "../../context/user.context";

import "./sign-up-form.styles.scss";
import Button from "../button/button.component.jsx";
import { signUpStart } from "../../store/user/user.action";

const defaultFromFields = {
  displayName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, repeatPassword } = formFields;
  const dispatch = useDispatch()

  const clearFileds = () => {
    setFormFields(defaultFromFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert(" the password does not match your");
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName))
      clearFileds();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already exists");
      } else {
        console.log("hata aik ", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
    // console.log(formFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <h1>Sign up with email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
          type="text"
        />

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

        <FormInput
          label="Repeat Password"
          onChange={handleChange}
          name="repeatPassword"
          value={repeatPassword}
          required
          type="password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
