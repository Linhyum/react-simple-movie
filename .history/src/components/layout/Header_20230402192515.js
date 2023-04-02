import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [dark, setDark] = useState(true);
    const active = ({ isActive }) => isActive && "text-primary";
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
            <header className="header text-xl font-semibold flex items-center justify-center gap-x-10  py-10 mb-5">
                <NavLink to={"/"} className={active}>
                    Home
                </NavLink>
                <NavLink to={"/movies"} className={active}>
                    Movies
                </NavLink>
            </header>
            <button
                className="fixed z-50 bottom-8 right-8  w-12 h-12 rounded-full bg-primary text-2xl"
                onClick={handleClick}
            >
                <i class="fa-solid fa-house"></i>
            </button>
            <div className="relative w-16 h-10 rounded-full bg-primary">
                <div className="absolute w-10 h-10 rounded-full bg-white"></div>
            </div>
        </>
    );
};

export default Header;
