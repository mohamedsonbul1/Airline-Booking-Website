import React from 'react';

import {render} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./components/login"
import AdminHomePage from "./components/AdminHomePage"
import FlightsList from "./components/flightsList"
import EditFlights from "./components/EditFlight"
import Addflight from './components/Addflight';
import Search from './components/search';
import UserSearch from './components/userSearch';
import SearchResult from './components/searchResult';
import Home from './components/HomePage';
import UserLogin from './components/userLogin';
import UserSignUp from './components/userSignUp';
import UserHomePage from "./components/UserHomePage"
import SelectedFlight from "./components/SelectedFlight"
import SelectedReturnFlight from "./components/SelectedReturnFlight"
import ReturnFlights from "./components/returnFlights"
import Summary from "./components/Summary"
import DepSeats from "./components/DepSeats"
import DepSeats2 from "./components/DepSeats2"
import Confirm from "./components/Confirm";
import ReservationList from "./components/reservationList";
import Edituser from './components/EditUser';
import GeustUserHomePage from './components/GeustUserHomePage';
import ChangePassword from './components/ChangePassword';
import SelectedReservedFlight from './components/SelectedReservedFlight';
import ChangeSeats from './components/ChangeSeats';
import ChangeSeats2 from './components/ChangeSeats2';

import EditReservedFlight from './components/EditReservedFlight';
import SelectedFlight1M3 from './components/SelectedFlight1M3';
import ChooseSeatsEdit from './components/ChooseSeatsEdit';
import PayEdit1 from './components/PayEdit1';
import PayEdit2 from './components/PayEdit2';
import Itinerary1 from './components/Itinerary1';
import Itinerary2 from './components/Itinerary2';

const rootElement = document.getElementById("root");

render(
  
    <BrowserRouter>
    <Routes> 
    <Route
      path = "/" element = {<Home/>}
      />
     <Route
      path = "/login" element = {<Login/>}
      />
      <Route path="/UserHomePage/editUser/:id" element = {<Edituser/>} />
      <Route path="/UserHomePage/ChangePassword/:id" element = {<ChangePassword/>} />
      <Route path="/userLogin" element = {<UserLogin/>} />
      <Route path="/userSignUp/" element = {<UserSignUp/>} />
      <Route path ="/AdminHomePage" element = {<AdminHomePage/>}/>
      <Route path ="/UserHomePage/:id" element = {<UserHomePage/>}/>
      <Route path ="/GeustUserHomePage/:id" element = {<GeustUserHomePage/>}/>
      <Route path="/AdminHomePage/flightsList" element={<FlightsList/>} />
      <Route path="/AdminHomePage/Addflight/" element = {<Addflight/>} />
      
      <Route path="/AdminHomePage/edit/:id" element = {<EditFlights/>} />
      <Route path="/AdminHomePage/search/" element = {<Search/>} />
      <Route path="/UserHomePage/userSearch/:id" element = {<UserSearch/>} />
      <Route path="/UserHomePage/SelectedFlight/:id" element = {<SelectedFlight/>} />
      <Route path="/UserHomePage/SelectedReturnFlight/:id" element = {<SelectedReturnFlight/>} />
      

      <Route path="/UserHomePage/returnFlights/:id" element={<ReturnFlights/>} />
      <Route path="/UserHomePage/Summary/:id" element={<Summary/>} />
      <Route path="/UserHomePage/DepSeats/:id" element={<DepSeats/>} />
      <Route path="/UserHomePage/DepSeats2/:id" element={<DepSeats2/>} />
      <Route path="/UserHomePage/Confirm/:id" element={<Confirm/>} />
      <Route path="/UserHomePage/reservationList/:id" element={<ReservationList/>} />
      <Route path="/UserHomePage/SelectedReservedFlight/:id" element={<SelectedReservedFlight/>} />
      <Route path="/UserHomePage/ChangeSeats/:id" element={<ChangeSeats/>} />
      <Route path="/UserHomePage/ChangeSeats2/:id" element={<ChangeSeats2/>} />

      <Route path="/UserHomePage/EditReservedFlight/:id" element={<EditReservedFlight/>} />
      <Route path="/UserHomePage/SelectedFlight1M3/:id" element={<SelectedFlight1M3/>} />
      <Route path="/UserHomePage/ChooseSeatsEdit/:id" element={<ChooseSeatsEdit/>} />
      <Route path="/UserHomePage/PayEdit1/:id" element={<PayEdit1/>} />
      <Route path="/UserHomePage/PayEdit2/:id" element={<PayEdit2/>} />
      <Route path="/UserHomePage/Itinerary1/:id" element={<Itinerary1/>} />
      <Route path="/UserHomePage/Itinerary2/:id" element={<Itinerary2/>} />



      {/* <Route path="/AdminHomePage/searchResult/" element = {<SearchResult/>} /> */}
      </Routes>
     
    </BrowserRouter>
 ,
 rootElement
);


