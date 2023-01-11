import React from "react";
import { Link } from "react-router-dom";

function CheckoutConfirmation() {
  return (
    <div className="alert alert-success" role="alert">
      Your Order has been placed. Check your email for confirmation.
    </div>
  );
}

export default CheckoutConfirmation;
