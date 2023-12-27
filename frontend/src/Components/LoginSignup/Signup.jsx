import React ,{useEffect, useState} from 'react'
import './Login.css'
import { Link,useNavigate } from 'react-router-dom'
const Signup = () => {
  const baseurl=process.env.REACT_APP_BASE_URL;
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
   const navigate=useNavigate();
  
    const [error,seterror]=useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
      const addUser = { name, email, password };
  
      const response = await fetch(`${baseurl}/signup`, {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json", //to save from cors issues
        },
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        seterror(result.error)
        setTimeout(() => {
        seterror("")
      }, 3000)

      setemail("")
      setpassword("")
      setname("")
    
      }
      if (response.ok) {
       seterror("");
       setname("");
       setemail("");
       setpassword("");
       navigate('/login');
      }
    };
    useEffect(()=>{
  
    },[error]);
    
  return (
    <div className="login-signup">
       
    <div className="loginsignup-conatiner">
        <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="login-fields">
        <input type="text" value={name} name=""onChange={(e) => setname(e.target.value)} placeholder="Your Name" id="name" />
        <input type="email"value={email} name=""onChange={(e) => setemail(e.target.value)} placeholder="Email" id="email" />
        <input type="password" value={password} name="" onChange={(e) => setpassword(e.target.value)}placeholder="Password" id="password" />
        {error&&<div class="alert">{error}</div>}
      </div>
      <button>Contiue</button>
      <p className="login-login">
        Already have an account ? <span><Link to='/login'style={{textDecoration:'none',color:' rgb(165, 155, 42)'}}>Login</Link></span>
      </p>
      <div className="login-agree">
        <input type="checkbox" name="" id=""  required/>
        <p >By continuing , i agree to the terms of use & privacy policy. </p>
      </div></form>
    </div>
  </div>
  )
  
}

export default Signup