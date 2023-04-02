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
            <div className="fixed top-3 right-3 z-50">
                <div className="relative w-20 h-10 rounded-full bg-primary">
                    <div className="absolute w-9 h-9 rounded-full bg-white left-0"></div>
                </div>
            </div>
        </>
    );
};

export default Header;
