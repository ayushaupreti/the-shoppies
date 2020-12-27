import React, { Fragment } from "react";
import loadable from "@loadable/component";
import './App.css';

const Loading = (
  <div className="loading">
    <div className="text-center middle">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

const Header = loadable(() => import("./components/Header"), {
  fallback: Loading,
});

const Footer = loadable(() => import("./components/Footer"), {
  fallback: Loading,
});

const SearchBar = loadable(() => import("./components/Search"), {
  fallback: Loading,
});

function App() {
  return (
    <Fragment>
      <Header></Header>
      <SearchBar></SearchBar>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;
