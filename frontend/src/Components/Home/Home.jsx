import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Postcard from "../Po/Postcard";
const Home = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const seteditdelete = false;
  const [error, seterror] = useState("");
  const [data, setData] = useState();
  const navigate = useNavigate();
  async function getData() {
    const response = await fetch(`${baseurl}/blog`);
    const result = await response.json();
    if (!response.ok) {
      seterror(result.seterror);
    }
    if (response.ok) {
      seterror("");
      setData(result);

      
    }
  }
  useEffect(() => {
    getData();
  }, []);

  async function handleDelete(ido) {
    const response = await fetch(`${baseurl}/blog/${ido}/delete`, {
      method: "DELETE",
    });
    const result = await response.json();
   
    if (!response.ok) {
      seterror(result.seterror);
    }
    if (response.ok) {
      seterror("");
     
      setTimeout(() => {
        seterror("");
        getData();
      }, 500);
    }
  }

  return (
    <div className="Home">
      <div className="head-div">
      <h1 className="h-head">
        Infinite<br></br> Insights <br></br>Hub
        <span>Infinite<br></br> Insights <br></br>Hub</span>
      
      </h1>
      
      <div className="ig-div" >
       
      {data?.slice(0,5)?.map((i) => {
        return <img className="ig"src={i.image} alt={"image"}/>;
      })}</div></div>
      <h2>Trending </h2>
      <div className="yp-post" id='ig'>
        {data?.map((item, i) => {
          return (
            <>
              <Postcard
                key={i}
                handleDelete={handleDelete}
                author={item.author}
                idd={item._id}
                image={item.image}
                title={item.title}
                desc={item.desc}
                get={getData}
                set={seteditdelete}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
