import SignUpSignIn from "./SignUpSignIn";
import { X } from "react-bootstrap-icons";
import "../styles/signUpSignIn.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useRef, useEffect } from "react";

function LoginModal({closeModal}) {
    const [fade, setFade] = useState(false);

    // const closeModal = () => {
    //     setFade(true)
    // }



  return (
    <>
    <div className="modal modalWrap"> 
    <div className="LoginModal ">
    < X size={50} className="CloseButton" onClick={closeModal} />
    <SignUpSignIn />
    </div>
     </div>
    </>
  );
}

export default LoginModal;
