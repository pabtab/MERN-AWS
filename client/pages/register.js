import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Register",
  });

  const { name, email, password, error, success, buttonText } = state

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Register",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({...state, buttonText: 'Registering'})

    try {
      const res = await axios.post(`${process.env.API}/register`, {
        name,
        email,
        password
      })
      setState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submitted',
        success: res.data.message
      })
    } catch (error) {
      setState({...state, buttonText: 'Register', error: error.response.data.error})
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          placeholder="Type your name"
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          placeholder="Type your email"
          value={email}
          required
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          placeholder="Type your password"
          value={password}
          required
        />
      </div>
      <div className="form-group">
        <button className="btn btn-outline-warning">{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      {success && showSuccessMessage(success)}
      {error && showErrorMessage(error)}
      <div className="col-md-6 offset-md-3">
        <h1>Register</h1>
        <br />
        {registerForm()}
        <hr />
        {JSON.stringify(state)}
      </div>
    </Layout>
  );
};

export default Register;
