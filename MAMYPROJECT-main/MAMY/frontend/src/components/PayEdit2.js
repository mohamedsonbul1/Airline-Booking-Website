import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm2 from "./CheckoutForm2";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51KH6uJInKywrx2SvUnJFKLLRej00NuyHRBqNqHJTNLEK8lol97P3Fnt7Kwa1HiGNO6uOHQjExXO9EfKvrVANJBIt00paWg3F8J");



 function getPrice(){
  var x=window.location.pathname;
  var price=0;
  for(var i=0;i<x.length;i++){
    if(x.substring(i,i+1)=="$"){
      price=Number.parseInt(window.location.pathname.substring(i));
      return (x.substring(i+1));
    }
  }
  price=100;
  }

export default function PayEdit2() {
  const [clientSecret, setClientSecret] = useState("");

  
  // var price=100;
  // alert(getPrice())

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/UserHomePage/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: getPrice() }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  




  return (
    <div>
    <div className="PaymentTitle" >
      <h3>Please Proceed the following Payment</h3>
      </div>
      <div className="bodyShape">
      {clientSecret && (
        
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm2 />
        </Elements>
      )}
      </div>
    
    </div>
  );
}




























