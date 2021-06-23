import React from "react";
import { Header } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";

export default function HeaderContainer({ children }) {
  return (
    <Header>
      <Header.Frame>
        <Header.Logo alt="Netflix" to={ROUTES.HOME} src={logo} />
        <Header.ButtonLinks to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLinks>
      </Header.Frame>
      {children}
    </Header>
  );
}
