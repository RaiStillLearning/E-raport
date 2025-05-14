import React from "react";
import "./App.css";

// import components
import NavbarComponent from "../components/navbar";
import LoginForm from "../LoginForm/LoginPage";

function App() {
  return (
    <>
      <NavbarComponent />
      <div className="mt-5">
        <LoginForm />
      </div>
    </>
  );
}

export default App;
