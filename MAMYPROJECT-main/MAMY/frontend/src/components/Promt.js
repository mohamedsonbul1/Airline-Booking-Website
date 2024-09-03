import React, { Fragment } from "react";
import { useAlert } from "react-alert";

const Promt = props => {
  const alert = useAlert();

  return (
    <Fragment>
      <button
        onClick={() => {
          alert.show("Are u sure u want to delete this flight?");
        }}
      >
        delete
      </button>
      
      
    </Fragment>
  );
};

export default Promt;