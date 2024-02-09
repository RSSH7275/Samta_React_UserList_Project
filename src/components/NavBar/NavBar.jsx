import React from 'react';
import { PiUserListFill } from "react-icons/pi";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
    <PiUserListFill style={{width:'100%',height:'80%',color:'#000'}}/>
    </div>
  )
}

export default NavBar;