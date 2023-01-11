import React from "react";
import { useState } from "react";
import Axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sumbitHandler = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/contact", {
      name: name,
      email: email,
      message: message,
    })
      .then(() => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container mb-3">
      <h3>Contact Us</h3>
      <form className="form-group" onSubmit={sumbitHandler}>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={onNameChange}
          required
        />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={onEmailChange}
          required
        />
        <label htmlFor="message" className="form-label">
          Your Message
        </label>
        <textarea
          type="text"
          className="form-control"
          id="message"
          onChange={onMessageChange}
          required
        />
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
