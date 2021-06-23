import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./pages/home";
import { Signin, Browse, Signup } from "./pages/index";

const App = () => {
  return (
    <Router>
      <Route path={ROUTES.HOME}>
        <Home />
      </Route>
    </Router>
  );
};

export default App;
