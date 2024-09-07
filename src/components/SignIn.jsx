import Form from "react-bootstrap/Form";
import "../styles//userInput.css";
import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import InputItem from "./InputItem";
import bcrypt from "bcryptjs";
import firebase from "firebase/compat/app";
import { db } from "../index";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const SignIn = () => {
  var user = {
    email: "",
    password: "",
  };
  const [theUser, setTheUser] = useState(user);
  const [message, setMessage] = useState("");

  //errors for useRef
  const [errors, setErrors] = useState(false);

  const userEmail = useRef();
  const Password = useRef();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  let formValid = false;
  const submit = async (e) => {
    e.preventDefault();

    try {
      const userInput = {
        email: userEmail.current.value,
        password: Password.current.value,
      };

      // const newErrors = user;

      const usersRef = collection(db, "users");
      const usersq = query(usersRef, where("email", "==", userInput.email));
      const querySnapshot = await getDocs(usersq);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const thisUserDb = userDoc.data();
        formValid ? setTheUser(thisUserDb) : theUser;

        const isPasswordValid = bcrypt.compareSync(
          userInput.password,
          thisUserDb.password,
        );

        if (isPasswordValid) {
          formValid = true;
          console.log(
            "The Login is successful, the current user is: ",
            thisUserDb.firstName,
          );
          setErrors(false);
          setMessage("successful login, please close the window")
        } else {
          const newErrors = { password: "Invalid password  or email" };
          setErrors(newErrors);
        }
      } else {
        const newErrors = { email: "Invalid email or user does not exist" };
        setErrors(newErrors);
      }
    } catch (error) {
      console.log("login not successful", errors);
    }
  };

  return (
    <>
      <form className="userForm w-100 mb-1 pb-0" onSubmit={submit}>
        <InputItem
          ref={userEmail}
          placeholder={errors.email ? errors.email : "Email"}
          type="email"
          error={errors.email || undefined}
        />

        <InputItem
          ref={Password}
          type="password"
          placeholder={errors.password ? errors.password : "Password"}
          error={errors.password || undefined}
        />
        {errors.password && (
          <p className="m-0" style={{ color: "red" }}>
            {errors.password}
          </p>
        )}
        {!errors.password && errors.email ? (
          <p className="m-0" style={{ color: "red" }}>
            {errors.email}
          </p>
        ) : !errors.password && !errors.email && message ? (
          <p className="m-0" style={{ color: "green" }}>
            {message}
          </p>
        ) : null}

        <Button
          className={formValid ? "mt-2 summit formValid" : "p-2 mt-2 summit"}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};
export default SignIn;
