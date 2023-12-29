import React,{useState,useEffect} from "react";
import './Login.css'
import {Link,useNavigate} from 'react-router-dom'
import { useUserId } from "../../Context/userContext";
import { useAuth } from "../../Context/authContext";
const Login = () => {
  const [auth, setauth] = useAuth();
  const baseurl=process.env.REACT_APP_BASE_URL;
 
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error,seterror]=useState();
    const [data,setData]=useState();
   const navigate=useNavigate()
 const getData=async(e)=>{
 
  e.preventDefault();
    const addUser = { email, password };
    const res=await fetch(`${baseurl}/login`,{
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json", //to save from cors issues
        },
    });
    const result=await res.json();
    if (!res.ok) {
      seterror(result.error)
      setTimeout(() => {
        seterror("")
      }, 3000)
      
      setemail("")
      setpassword("")
    }
    if (res.ok) {
     seterror("");
     setData(result);
     setauth({
      ...auth,
      user: result.user,
      token: result.token,
    });
    localStorage.setItem("auth", JSON.stringify(result));
     
     navigate(`/`)
    }
  }
  useEffect(()=>{
  
  },[error])
  return (
    <div className="login-signup">
        {data}
      <div className="loginsignup-conatiner">
        
     
      <form onSubmit={getData}>
        <h1>Log in</h1>
        <div className="login-fields">
          <input type="email" value={email} name="email" placeholder="Email" id="email"onChange={(e) => setemail(e.target.value)} />
          <input type="password" value={password}  name="password" placeholder="Password" id="password"onChange={(e) => setpassword(e.target.value)} />
          {error&&<div class="alert "> {error}</div>}
        </div>
        
        <button > Contiue</button>
        <p className="login-login">
         Create a new account? <span><Link to='/signup'style={{textDecoration:'none',color:' rgb(165, 155, 42)'}}>Signup</Link></span>
        </p>
        <div className="login-agree">
        </div>
        </form>
      </div>
     

    </div>
  );
};
export default  Login;
