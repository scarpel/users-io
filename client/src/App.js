import './App.css';
import { Switch, Route } from "react-router-dom"
import Users from "./pages/Users"
import User from "./pages/User"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/users" component={Users}/>
        <Route path="/users/:login" component={User}/>
        <Route path="/404" component={PageNotFound}/>
        <Route path="/" component={PageNotFound}/>
      </Switch>
    </div>
  );
}

export default App;
