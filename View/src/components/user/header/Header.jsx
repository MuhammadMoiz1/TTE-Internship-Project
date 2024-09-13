import React from 'react'
import "./Header.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate();
  return (
    <div className='header'>
     <div className='header-content'>
        <h2>Excellence in Mobile Assembly: Defect Mastery</h2>
        <p>Unlock the secrets to identifying and preventing defects in mobile components. Start your journey towards producing flawless mobile devices with our expert-led training!</p>
         <button onClick={()=>navigate('/models')}>Explore</button>
     </div>
    </div>
  )
}

export default Header;
