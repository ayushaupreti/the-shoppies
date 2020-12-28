import React, { Suspense } from "react";
import './App.css';


const Header = React.lazy(() => import("./components/Header"));
const Footer = React.lazy(() => import("./components/Footer"));
const SearchBar = React.lazy(() => import("./components/Search"));
const Results = React.lazy(() => import("./components/Results"));


function App() {
  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
         <Header />
       </Suspense>
      <div className="row">
      <Suspense fallback={<div>Loading...</div>}>
         <SearchBar />
       </Suspense>
      </div>
      <div className="row">
      <Suspense fallback={<div>Loading...</div>}>
         <Results />
       </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
         <Footer />
       </Suspense>
    </div>
  );
}

export default App;
