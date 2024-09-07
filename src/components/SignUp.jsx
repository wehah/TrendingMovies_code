import Form from "react-bootstrap/Form";

import "../styles/userInput.css";
import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import InputItem from "./InputItem";
import bcrypt from "bcryptjs";
import React from "react";
import firebase from "firebase/compat/app";
import { db } from "../index";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";

const SignUp = () => {
  var user = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [theUser, setTheUser] = useState(user);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(false);

  const userEmail = useRef();
  const FirstName = useRef();
  const LastName = useRef();
  const Password = useRef();

  let formValid = true;
  const submit = async (e) => {
    e.preventDefault();

    try {
      //  const [movies] = useCollectionData(movieRef, { idField: "id" });

      const userInput = {
        firstName: FirstName.current.value,
        lastName: LastName.current.value,
        email: userEmail.current.value,
        password: Password.current.value,
      };

      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
      };

      const newErrors = user;

      //initialising the database collection

      const usersRef = collection(db, "users");
      const usersq = query(usersRef, where("email", "==", userInput.email));
      const querySnapshot = await getDocs(usersq);
      const newUserRef = doc(usersRef);

      Object.keys(userInput).forEach((key) => {
        if (userInput[key].trim() === "") {
          newErrors[key] = `${key} is required`;
          formValid = false;
        } else if (key === "email" && !isValidEmail(userInput[key])) {
          newErrors[key] = "Valid email address is required";
          formValid = false;
        } else if (key === "email" && !querySnapshot.empty) {
          newErrors[key] = "Email already exists";
          formValid = false;
        } else if (key === "password" && !isValidPassword(userInput[key])) {
          newErrors[key] =
            "Valid password is required with minimum 8 characters, one letter and one number";
          formValid = false;
        }
      });

      setErrors(newErrors);

      if (formValid) {
        setTheUser({
          ...theUser,
          firstName: FirstName.current.value,
          lastName: LastName.current.value,
          email: userEmail.current.value,
          password: Password.current.value,
        });
        await addDoc(usersRef, {
          ...theUser,
          firstName: FirstName.current.value,
          lastName: LastName.current.value,
          email: userEmail.current.value,
          password: bcrypt.hashSync(Password.current.value, 10),
          id: newUserRef.id,
        });
        setMessage("Successful Sign Up, Please close the Window");
        setErrors(false);
        console.log(message);
        FirstName.current.value = "";
        LastName.current.value = "";
        userEmail.current.value = "";
        Password.current.value = "";
      } else {
        console.log(`There was an error while trying to sign up:`, errors);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  useEffect(() => {
    console.log(`The user hasbeen added to the database`, theUser);
  }, [theUser.email]);

  return (
    <>
      <form className="userForm w-100 mb-1  pb-0" onSubmit={submit}>
        <InputItem
          ref={userEmail}
          placeholder={errors.email ? errors.email : "Email"}
          type="email"
          error={errors.email || undefined}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <InputItem
          ref={FirstName}
          placeholder={errors.firstName ? "First name required" : "First name"}
          type="text"
          error={errors.firstName || undefined}
        />

        <InputItem
          ref={LastName}
          placeholder={errors.lastName ? "last name required" : "Last name"}
          type="text"
          error={errors.lastName || undefined}
        />

        <InputItem
          ref={Password}
          type="password"
          placeholder={errors.password ? errors.password : "Password"}
          error={errors.password || undefined}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        {!errors && message ? (<p style={{ color: "green" }}>{message}</p> ) : null}

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
export default SignUp;
