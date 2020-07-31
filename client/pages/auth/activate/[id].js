import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import jwt from "jsonwebtoken";
import axios from "axios";
import Layout from "../../../components/Layout";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";

const activateAccount = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    showButton: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });

  const { name, token, buttonText, success, error } = state;

  useEffect(() => {
    let token = router.query.id;

    if (token) {
      const { name } = jwt.decode(token);
      setState({ ...state, name, token });
    }
  }, [router]);

  const clikSubmit = async (e) => {
    e.preventDefault();
    console.log("act");
    setState({ ...state, buttonText: "Activating" });
    try {
      const response = await axios.post(
        `${process.env.API}/register/activate`,
        {
          token,
        }
      );
      setState({
        ...state,
        name: "",
        token: "",
        buttonText: "Activated",
        success: response.data.message,
      });

      console.log(response);
    } catch (error) {
      setState({ ...state, error: error.response.data.error, buttonText: 'Activate Account' });
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Hello {name}, ready to activate your account?</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <button
            className="btn btn-outline-warning btn-block"
            onClick={clikSubmit}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(activateAccount);
