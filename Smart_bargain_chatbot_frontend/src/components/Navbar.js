import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import "./Navbar.css";

import SellButton from "./SellButton";
import SellButtonPlus from "./SellButtonPlus";
import OlxLogo from "../assets/OlxLogo";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Convert to boolean
    }, []);

    // Handle logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="navbar">
            {/* Left Side - Logo and Location Dropdown */}
            <div className="navbar-left">
                <img src="https://help.olx.in/hc/theming_assets/01HZM468CSMFCHTZX2Z58W6N07" alt="OLX Logo" className="logo" onClick={() => navigate("/")} />
                {/* <OlxLogo /> */}
                <div className="location-selector">
                    {/* <span>India</span> */}
                    <div className="loc-bar">
                        <FaSearch size={25} className="location-sicon" />
                        <input type="text" placeholder='  Search city, area or locality' className="search-input" value="India" />
                        <IoIosArrowDown size={30} className="arrow-icon" />
                    </div>
                </div>
            </div>

            {/* Center - Search Bar */}
            <div className="cont-s">
                <div className="search-bar">
                    <input type="text" placeholder='  Search "Products"' className="search-input" />
                </div>
                <div className="icon-container"><FaSearch size={24} className="search-icon" /></div>
            </div>

            {/* Right Side - Login and Sell Button */}
            <div className="navbar-right">
                <FaRegHeart size={22} className="heart-icon" onClick={() => navigate("/cart")} />
                {/* <b><span className="login-button" onClick={()=> navigate('/login')}>Login</span></b> */}
                {/* Conditional Rendering for Login/Logout */}
                {isLoggedIn ? (
                    <b><span className="logout-button" onClick={handleLogout}>Logout</span></b>
                ) : (
                    <b><span className="login-button" onClick={() => navigate("/login")}>Login</span></b>
                )}


                <div className="sellMenu" onClick={() => navigate("/add-product")}>
                    <SellButton></SellButton>
                    <div className="sellMenuContent">
                        <SellButtonPlus></SellButtonPlus>
                        <span>SELL</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

