import { Switch, Route } from "react-router-dom";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import Welcome from "../pages/welcome";

const Navigate = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/" component={SignUp} />
      <Route exact path="/welcome" component={Welcome} />
    </Switch>
  );
};

export default Navigate;
