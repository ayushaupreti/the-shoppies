import React, { Suspense } from "react";
import './App.css';


const Header = React.lazy(() => import("./components/Header"));
const SearchBar = React.lazy(() => import("./components/Search"));
const Results = React.lazy(() => import("./components/Results"));
const Nominations = React.lazy(() => import("./components/Nominations"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
        <Header />
        <div className="row mt-5 pt-5">
          <div className="col-8">
            <SearchBar />
            <Results />
          </div>
          <div className="col-4">
            <Nominations />
          </div>
        </div>
      </div>
    </Suspense >
  );
}

export default App;
