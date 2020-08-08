import React from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { logout, isAuth } from "../helpers/auth";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = ({ children }) => {
  const head = () => (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="/static/css/styles.css" />
    </>
  );

  const nav = () => (
    <ul className="nav nav-tabs bg-warning">
      <li className="nav-item">
        <Link href="/">
          <a className="nav-link text-dark">Home</a>
        </Link>
      </li>
      {!isAuth() && (
        <>
          <li className="nav-item ml-auto">
            <Link href="/login">
              <a className="nav-link text-dark" href="/login">
                Login
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/register">
              <a className="nav-link text-dark">Register</a>
            </Link>
          </li>
        </>
      )}
      {isAuth() && isAuth().role === "admin" && (
        <li className="nav-item ml-auto">
          <Link href="/admin">
            <a className="nav-link text-dark" href="/login">
              {isAuth().name}
            </a>
          </Link>
        </li>
      )}
      {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item">
          <Link href="/user">
            <a className="nav-link text-dark" href="/login">
              {isAuth().name}
            </a>
          </Link>
        </li>
      )}
      {isAuth() && (
        <li className="nav-item ">
          <a onClick={logout} className="nav-link text-dark">
            Logout
          </a>
        </li>
      )}
    </ul>
  );

  return (
    <div>
      {head()}
      {nav()}
      <div className="container pt-5 pb-5">{children}</div>
    </div>
  );
};

export default Layout;
