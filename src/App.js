import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login/Login";
import AuthProvider from "./Context/AuthProviced/AuthProvider";
import RegisterUser from "../src/Pages/Login/Register/RegisterUser";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import Purchase from "./Pages/Purchase/Purchase";
import DashBoard from "./Pages/DashBoard/DashBoard/DashBoard";
import Payment from "./Pages/DashBoard/Payment/Payment";
import Myorders from "./Pages/DashBoard/Myorders/Myorders";
import Explore from "./Pages/Explore/Explore";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/explore">
              <Explore></Explore>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <RegisterUser></RegisterUser>
            </Route>
            <PrivateRoute path="/purchase/:flowerId">
              <Purchase></Purchase>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <DashBoard></DashBoard>
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
