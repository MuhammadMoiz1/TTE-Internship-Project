import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../../assets/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, NavLink } from 'react-router-dom';


const Navbar = () => {
    const [menu,setMenu]=useState('Home')
    const [close,setClose]=useState(false)
    const [hamClass,setHamClass]=useState('navbar-menu');
    const navigate=useNavigate();
    const handleSignInClick = () => {
      navigate('/login');
    };
  return (
    <div className='navbar'>
      <img src={logo} alt="" className='logo' />
      
      <ul className={hamClass}>
        <NavLink to="/" 
        className={({ isActive, isPending }) =>
          isPending ? "" : isActive ? "active" : ""
        }
        onClick={()=>{setClose(false);setHamClass("navbar-menu")}}
        >Home</NavLink>
        <NavLink to="/models" 
        className={({ isActive, isPending }) =>
          isPending ? "" : isActive ? "active" : ""
        }
        onClick={()=>{setClose(false);setHamClass("navbar-menu")}}
        >Explore</NavLink>
        <NavLink to="/defects" 
        className={({ isActive, isPending }) =>
          isPending ? "" : isActive ? "active" : ""
        }
        onClick={()=>{setClose(false);setHamClass("navbar-menu")}}
        >Defects</NavLink>
        <NavLink to="/dashboard" 
        className={({ isActive, isPending }) =>
          isPending ? "" : isActive ? "active" : ""
        }
        onClick={()=>{setClose(false);setHamClass("navbar-menu")}}
        >Dashboard</NavLink>
        <NavLink 
        to="/login" 
        style={{display:'none'}} 
        onClick={()=>setMenu('SignIn')} 
        className={menu==='SignIn ham-sign'?'active':'ham-sign'}>Sign In</NavLink>
      </ul>
      <div className='navbar-right'>
        <button onClick={handleSignInClick}>Sign in</button>
      </div>
      <div className='hamburger'>
          {
            close?(<CloseIcon style={{fontSize:'40px'}} onClick={()=>{setClose(false);setHamClass("navbar-menu")}}/>):(<MenuIcon style={{fontSize:'40px'}} onClick={()=>{setClose(true);setHamClass("navbar-menu ham-active")}}/>)
          }
        </div>
      
    </div>
  )
}

export default Navbar;
