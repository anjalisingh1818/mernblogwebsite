import React from 'react'
import './Pagenotfound.css'
import { Link } from 'react-router-dom'
const Pagenotfound = () => {
  return (
    <div className='pagenotfound'>
        <h1 className='c404'>404</h1>
        <h2 >Ooops! Page Not Found</h2>
      <button className='pnf'>  <Link to='/' style={{textDecoration:'none',color:'black'}} >Get Back to Home</Link></button>
    </div>
  )
}

export default Pagenotfound