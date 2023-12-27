import React,{ useState} from "react";
import "./Postcard.css";
import { Link } from "react-router-dom";
import { useId } from "../../Context/IdContext";
import img2 from './delete.png'
import img1 from './edit.png';

const Postcard = (props) => {
  
  function simulatedelete(){
   props.handleDelete(props.idd);
  }
 const {setContextId}=useId();
 function setid(){
 setContextId(props.idd)
 }
  return (
    <div className="Postcard">
      <div className="pc-left">
        <img src={props.image} alt="post"  />
      </div>
      <div className="pc-right">
        <h3>
          <b>{props.title}</b>
        </h3>

        <p>{props.desc}</p>
        {/* <h5>
          <i>~{props.author.name}</i>
        </h5> */}
      </div>
      <div className="btn">
      { props.set&&< >
          <Link to={`/edit/${props.idd}`} onClick={setid}> <img src={img1} alt="" /></Link>
          < a onClick={simulatedelete}>  <img src={img2} alt="" /></a>
      </>}
        
       
      </div>
      
    </div>
  );
};

export default Postcard;
 