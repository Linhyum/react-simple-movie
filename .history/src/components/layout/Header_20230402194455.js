import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [dark, setDark] = useState(true);
    const active = ({ isActive }) => isActive && "text-primary";
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (dark) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
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
                <div
                    className={`relative transition-all duration-300 w-20 h-9 flex items-center cursor-pointer rounded-full ${
                        dark ? "bg-primary" : "bg-slate-600"
                    } `}
                    onClick={() => setDark(!dark)}
                >
                    <div
                        className={`absolute flex items-center justify-center transition-all duration-300 w-8 h-8 rounded-full  ${
                            dark ? "left-full -translate-x-full bg-white" : "left-0 bg-primary"
                        }`}
                    >
                        {/* {dark
                            ? '<i class="fa-solid fa-moon"></i>'
                            : '<i class="fa-solid fa-sun"></i>'} */}
                        <i class={`${dark ? "fa-solid fa-moon" : "fa-solid fa-sun"}`}></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
