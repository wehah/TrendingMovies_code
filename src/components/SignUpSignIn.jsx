import "../styles/signUpSignIn.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import InputItem from "./InputItem";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useState, useRef, useEffect } from "react";

const SignUpSignIn = React.forwardRef(({ type, placeholder, error }, ref) => {
  const [currentState, setCurrentState] = useState(true);
  const onSwitch = () => {
    if (!currentState) {
      setCurrentState(true);
    }
  };

  const offSwitch = () => {
    if (currentState) {
      setCurrentState(false);
    }
  };

  return (
    <div className=" flex-column loginCont ">
      <div className="w-100 d-flex justify-content-between buttonCont">
        <Button
          onClick={onSwitch}
          className={currentState ? "signUp currentState" : "p-2 signUp"}
          variant="primary"
        >
         Sign Up 
        </Button>
        <Button
          onClick={offSwitch}
          className={currentState ? "signIn" : "p-2 signIn currentState"}
          variant="primary"
        >
          Sign In 
        </Button>
      </div>
      {currentState && <SignUp />}
      {!currentState && <SignIn />}
    </div>
  );
});
export default SignUpSignIn;
