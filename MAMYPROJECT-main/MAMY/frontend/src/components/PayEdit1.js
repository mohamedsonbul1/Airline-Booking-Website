import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
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



export default function PayEdit1() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/UserHomePage/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: getPrice()  }),
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
      <h3>Please Proceed with the Following Payment</h3>
      </div>
      <div className="bodyShape">
      {clientSecret && (
        
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    
    </div>
  );
}
















































// import React, { Component } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router';
// import { withRouter } from "react-router-dom";
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { Link } from 'react-router-dom';
// import DateTimePicker from 'react-datetime-picker';
// // import "./frontend/src/App.css";
// import {
//   Elements,
//   ElementsConsumer,
//   CardElement,
//   useElements,
//   useStripe
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe("pk_test_51KH6uJInKywrx2SvUnJFKLLRej00NuyHRBqNqHJTNLEK8lol97P3Fnt7Kwa1HiGNO6uOHQjExXO9EfKvrVANJBIt00paWg3F8J");



// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   return (
//     <>
//       <h1>stripe form</h1>
//       <CardElement />
//       <button onClick={handleSubmit(stripe, elements)}>Buy</button>
//     </>
//   );
// }

// const handleSubmit = (stripe, elements) => async () => {
//   const cardElement = elements.getElement(CardElement);

//   const {error, paymentMethod} = await stripe.createPaymentMethod({
//     type: 'card',
//     card: cardElement,
//   });

//   if (error) {
//     console.log('[error]', error);
//   } else {
//     console.log('[PaymentMethod]', paymentMethod);
//      // ... POST: /api/charge/user  
//   }
// };

// export default class PayEdit1 extends Component {
  
  
    
    
  



//   render() {
//     return (

//         <div>
//         <div className="container">
        
//       <Elements stripe={stripePromise}>
//         <ElementsConsumer>
//           {(ctx: any) => <PaymentForm {...ctx} />}
//         </ElementsConsumer>
//       </Elements>
        
//       </div>
//       </div>




//     )
//   }
// }