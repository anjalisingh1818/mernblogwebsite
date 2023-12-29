import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;

  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [desc, setdesc] = useState("");
  const navigate = useNavigate();
  const [error, seterror] = useState();
 const {id} =useParams()
  const getSingleBlog = async (id) => {
    const response = await fetch(`${baseurl}/blog/${id}`);
    const result = await response.json();
    if (!response.ok) {
      seterror(result.error);
    }
    if (response.ok) {
      seterror("");
      settitle(result.title);
      setimage(result.image);
      setdesc(result.desc);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedblog = { title, image, desc };
    const response = await fetch(`${baseurl}/blog/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedblog),
      headers: {
        "Content-type": "application/json", //to save from cors issues
      },
    });
    const result = await response.json();

    if (!response.ok) {
      seterror(result.error)
      setTimeout(() => {
        seterror("")
      }, 2000)
     
    }
    if (response.ok) {
      seterror("successfully edited");
      navigate("/yourposts");
    }
  };
  useEffect(() => {
  
    getSingleBlog(id);
  }, []);


  return (
    <div className="create">
     
      <form onSubmit={handleSubmit}>
        <div className="create-conatiner">
          <h1>Edit the Post </h1>
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

export default Edit;
