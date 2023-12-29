import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";

import { useAuth } from "../../Context/authContext";
const Create = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;
 const [auth]=useAuth();
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [desc, setdesc] = useState("");
  const navigate = useNavigate();
  const [error, seterror] = useState();

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const addblog = { title, image, desc };
    const response = await fetch(`${baseurl}/blog/create/${auth.user._id}`, {
      method: "POST",
      body: JSON.stringify(addblog),
      headers: {
        "Content-type": "application/json", 
      },
    });
    const result = await response.json();
    if (!response.ok) {
      seterror(result.error);
      setTimeout(() => {
        seterror("");
      }, 5000);
    }

    if (response.ok) {
      seterror("");
   
      navigate("/");
    }
  };
  return (
    <div className="create">
      

      <form onSubmit={handleSubmit}>
        <div className="create-conatiner">
          <h1>Write a Post </h1>
          {error && <div class="alert alert-danger">{error}</div>}
          <hr />
          <div className="create-fields">
            <input
              type="text"
              name="title"
              onChange={(e) => settitle(e.target.value)}
              placeholder="title"
              id="title"
              value={title}
            />
            <input
              type="text"
              name="image"
              onChange={(e) => setimage(e.target.value)}
              placeholder="image link"
              id="image"
              value={image}
            />
            <textarea
              name="desc "
              placeholder="description"
              id="desc"
              rows="10"
              onChange={(e) => setdesc(e.target.value)}
              defaultValue={desc}
            ></textarea>
          </div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
