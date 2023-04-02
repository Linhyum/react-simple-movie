import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
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
        </>
    );
};

export default Header;
