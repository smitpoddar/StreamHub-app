import React, { useEffect, useRef } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
import search_icon from "../../assets/search_icon.svg"
import bell_icon from "../../assets/bell_icon.svg"
import profile_img from "../../assets/profile_img.png"
import caret_icon from "../../assets/caret_icon.svg"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY >= 80){
        navRef.current.classList.add("dark-nav")
      }else{
        navRef.current.classList.remove("dark-nav");
      }
    })
  })

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Tv Show</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className="icon" />
        <p>Children</p>
        <img src={bell_icon} alt="" className="icon" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <p className="signout" onClick={()=>{
            navigate("/login")
          }}>Sign out</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar
