import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Router from 'next/router';
import Layout from "../components/Layout";
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import { authenticate, isAuth } from "../helpers/auth";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Login",
  });

  const { email, password, error, success, buttonText } = state

  useEffect(() => {
    isAuth() && Router.push('/')
  }, [])

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Login",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({...state, buttonText: 'Logining in'})

    try {
      const response = await axios.post(`${process.env.API}/login`, {
        email,
        password
      })

      authenticate(response, () => {
        if (isAuth() && isAuth().role === 'admin') {
          Router.push('/admin')
        } else {
          Router.push('/user')
        }
      })
      
    } catch (error) {
     setState({...state, buttonText: 'Login', error: error.response.data.error})
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
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
        <h1>Login</h1>
        {JSON.stringify(isAuth())}
        <br />
        {loginForm()}
        <hr />
        {JSON.stringify(state)}
      </div>
    </Layout>
  );
};

export default Login;
