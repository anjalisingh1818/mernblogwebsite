import React, { useState, useEffect } from "react";
import "./Yourpost.css";
import { Link} from "react-router-dom";
import Postcard from "../Po/Postcard";

import { useAuth } from "../../Context/authContext";
const Yourpost = () => {
  const [auth] = useAuth();

  const baseurl = process.env.REACT_APP_BASE_URL;
  const seteditdelete = true;
  const [load,setload]=useState(false)
 
  const [error, seterror] = useState("");
  const [data, setData] = useState();

  async function handleDelete(ido) {
    const response = await fetch(`${baseurl}/blog/${ido}/delete`, {
      method: "DELETE",
    });
    const result = await response.json();
  
    if (!response.ok) {
      seterror(result.error);
    }
    if (response.ok) {
      seterror("");

      setTimeout(() => {
        seterror("");
        getData();
      }, 500);
    }
  }
  async function getData() {
    setload(true)

    const response = await fetch(`${baseurl}/blog/show/${auth.user._id}`, {
      method: "GET",
    });
    const result = await response.json();
    
    if (!response.ok) {
      seterror(result.seterror);
    }
    if (response.ok) {
      seterror("");
      setData(result);
      setload(false)
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="yourpost">
    
      {
        data&&(data.length === 0 && (
          <div className="msg">
            
            Hey!! You have not posted yet <hr />
            <button className="createbtn">
              <Link
                to="/create"
                style={{ textDecoration: "none", color: "black" }}
              >
                Create
              </Link>
            </button>
          </div>
        ))}
          <h2>Your Posts</h2>
      <div className="yp-post">
        {data?.map((item, i) => {
          return (
            <Postcard
              key={i}
              idd={item._id}
              image={item.image}
              title={item.title}
              desc={item.desc}
              author={item.author}
              set={seteditdelete}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Yourpost;
