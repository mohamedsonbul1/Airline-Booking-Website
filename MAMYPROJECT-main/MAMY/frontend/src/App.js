import React from 'react';
import { BrowserRouter as Routes, Link, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import AdminHomePage from "./components/AdminHomePage";
import FlightsList from "./components/flightsList";
import EditFlights from "./components/EditFlight";
import Addflight from './components/Addflight';
import Search from './components/search';
import UserSearch from './components/userSearch';
import SearchResult from './components/searchResult';
import Home from './components/HomePage';
import UserSignUp from './components/userSignUp';
import UserLogin from './components/userLogin';
import UserHomePage from "./components/UserHomePage";
import SelectedFlight from "./components/SelectedFlight";
import ReturnFlights from "./components/returnFlights";





function App() {
  
 
  return (


    

    <Routes>
      <br/>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/userLogin" exact component={UserLogin} />
      <Route path="/userSignUp" exact component={UserSignUp} />
      <Route path="/AdminHomePage/Addflight" exact component={Addflight} />
      <Route path="/AdminHomePage" exact component={AdminHomePage} />
      <Route path="/UserHomePage" exact component={UserHomePage} />
      <Route path="/AdminHomePage/flightsList" exact component={FlightsList} />
      <Route path="/AdminHomePage/edit/:id" exact component={EditFlights} />
      <Route path="/AdminHomePage/search/" exact component={Search} />
      <Route path="/UserHomePage/userSearch/" exact component={UserSearch} />
      <Route path="/UserHomePage/SelectedFlight/:id" exact component={SelectedFlight} />

      <Route path="/AdminHomePage/searchResult/" exact component={SearchResult} />
      <Route path="/UserHomePage/returnFlights/:id" exact component={ReturnFlights} />

    </Routes>
  );
}

export default App;
