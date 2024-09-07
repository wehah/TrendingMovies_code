import "../styles/addcard.css";


import { XSquareFill  } from 'react-bootstrap-icons';

import firebase from "firebase/compat/app";

import { useState } from "react";

function AddCard({closeDisplay}) {

   const commentsRef = firebase.firestore().collection("comments");
   const [userComment, setUserComment] = useState("");
   const [userName, setUserName] = useState("");
   const [imageTags, setImageTags] = useState("");


   const addCardData = async (e) => {
      
      e.preventDefault();
      
      var newDocRef = commentsRef.doc();
      await newDocRef.set({
         user:userName,
         info: userComment,
         tags: imageTags,
         id: newDocRef.id
      });

      setUserComment("");
      setUserName("");
      setImageTags("");
      closeDisplay();
   };

   return (


   <div className="overlay">

      <div className="modal">

      <XSquareFill className="closeicon" onClick = {closeDisplay}/>

         <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Add a name..."
         />

         <input
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Add a comment..."
         />
         
         <input
            value={imageTags}
            onChange={(e) => setImageTags(e.target.value)}
            placeholder="Add image tags..."
         />

         <button onClick={addCardData} disabled={!userName||!userComment||!imageTags}>
            Add
         </button>

      </div>
   
   </div>

   );

}

export default AddCard;
