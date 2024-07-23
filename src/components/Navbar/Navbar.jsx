import React, { useEffect, useRef } from 'react';
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "..//../assets/profile_img.png";
import caret_icon from "..//../assets/caret_icon.svg";
import { Link } from 'react-router-dom';
import { logout } from '../../firebase';

const Navbar = () => {
    const navRef = useRef();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 80) {
                navRef.current.classList.add("nav-dark");
            } else {
                navRef.current.classList.remove("nav-dark");
                navRef.current.classList.add("nav-no-bg");
            }
        })
    }, [])

    return (
        <div className='navbar' ref={navRef}>
            <div className="navbar-left">
                <img src={logo} alt="" />
                <ul>
                    <li className='link'>Home</li>
                    <li className='link'>Tv Shows</li>
                    <li className='link'>Movies</li>
                    <li className='link'>New & Popular</li>
                    <li className='link'>My List</li>
                    <li className='link'>Browse by Languages</li>
                </ul>
            </div>
            <div className="navbar-right">
                <img src={search_icon} alt="" className='icons' />
                <p>Kids</p>
                <img src={bell_icon} alt="" className='icons' />
                <div className="navbar-profile">
                    <img src={profile_img} alt="" className='profile' />
                    <img src={caret_icon} alt="" />
                    <div className="dropdown">
                        <Link to="/login" className='dropdown-text' onClick={() => { logout() }}>Sign Out of Netflix</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;