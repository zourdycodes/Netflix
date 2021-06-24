import React, { useContext, useState } from "react";
import FooterContainer from "../containers/footer";
import HeaderContainer from "../containers/header";
// import JumbotronContainer from "../containers/jumbotron";
import { Form } from "../components";
import { useHistory } from "react-router";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Signup() {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "" || firstName === "";

  const handleSignUp = (event) => {
    event.preventDefault();

    const signUP = firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result) => {
        result.user
          .updateProfile({
            displayName: firstName,
            photoURL: Math.floor(Math.random() * 5) + 1,
            // photoURL: `/images/users/${Math.floor(Math.random() * 5) + 1}.png`,
          })
          .then(() => {
            history.push(ROUTES.BROWSE);
          });
      })
      .catch((error) => {
        setEmailAddress("");
        setFirstName("");
        setPassword("");
        setError(error.message);
      });

    return signUP;
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base method="POST" onSubmit={handleSignUp}>
            <Form.Input
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type="password"
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type="submit">
              Sign Up
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            Already have an Account?{" "}
            <Form.Link to="/signin">Sign in here.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>

      {/* <JumbotronContainer /> */}
      <FooterContainer />
    </>
  );
}
