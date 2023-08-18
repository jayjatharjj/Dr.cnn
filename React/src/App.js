import RouterComponent from "./Components/RouterComponent";
import React from 'react'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <RouterComponent/>
      <Footer/>
    </React.Fragment>
  );
}

export default App;