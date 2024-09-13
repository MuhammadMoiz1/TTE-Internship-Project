import React, { useState } from 'react'
import './adminNavbar.css'
import logo from '../../../assets/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminNavBar = ({ setAuth }) => {
    const [menu,setMenu]=useState('Home');
    const [close,setClose]=useState(false);
    const [hamClass,setHamClass]=useState('navbar-menu');
    const navigate=useNavigate()

    const handleLogout = () => {
      localStorage.removeItem('token');
      setAuth(false);
      navigate('/');
    };
  return (
    <div className='navbar'>
      <img src={logo} alt="" className='logo' />
      
      <ul className={hamClass}>
        <NavLink to="/admin/home" 
        className={({ isActive, isPending }) =>
          isPending ? "" : isActive ? "active" : ""
        }
        onClick={()=>{setClose(false);setHamClass("navbar-menu")}}
        >Home</NavLink>
        <NavLink to="/admin/models" 
        className={({ isActive, isPending }) =>
          isPending ? "" : isActive ? "active" : ""
        }
        onClick={()=>{setClose(false);setHamClass("navbar-menu")}}
        >Models</NavLink>
        <NavLink to="/admin/defects" 
        className={({ isActive, isPending }) =>
          isPending ? "" : isActive ? "active" : ""
        }
        onClick={()=>{setClose(false);setHamClass("navbar-menu")}}
        >Defects</NavLink>
        <NavLink 
        to="/" 
        style={{display:'none'}} onClick={()=>{setMenu('SignIn');handleLogout()}} 
        className={menu==='SignIn ham-sign'?'active':'ham-sign'}>
          Sign Out
          </NavLink>
      </ul>
      <div className='navbar-right'>
        <button onClick={()=>{handleLogout()}}>Sign Out</button>
      </div>
      <div className='hamburger'>
          {
            close?(<CloseIcon style={{fontSize:'40px'}} onClick={()=>{setClose(false);setHamClass("navbar-menu")}}/>):(<MenuIcon style={{fontSize:'40px'}} onClick={()=>{setClose(true);setHamClass("navbar-menu ham-active")}}/>)
          }
        </div>
      
    </div>
  )
}

export default AdminNavBar;
