import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const Header = () => {
    const { storedValue, setValue } = useLocalStorage("dark", false);

    const [dark, setDark] = useState(storedValue);
    const active = ({ isActive }) => (isActive ? "text-primary" : "");
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
            <header className="flex items-center justify-center py-10 mb-5 text-xl font-semibold header gap-x-10">
                <NavLink to={"/"} className={active}>
                    Home
                </NavLink>
                <NavLink to={"/movies"} className={active}>
                    Movies
                </NavLink>
            </header>
            <button
                className="fixed z-50 w-12 h-12 text-2xl transition-all rounded-full bottom-20 right-5 bg-primary"
                onClick={handleClick}
            >
                <i className="fa-solid fa-angle-up"></i>
            </button>
            <div className="fixed z-50 transition-all bottom-20 left-5">
                <div
                    className={`relative transition-all duration-300 w-20 h-9 flex items-center cursor-pointer rounded-full ${
                        dark ? "bg-primary" : "bg-slate-400"
                    } `}
                    onClick={() => {
                        setDark(!dark);
                        setValue(!dark);
                    }}
                >
                    <div
                        className={`absolute flex items-center justify-center transition-all duration-300 w-8 h-8 rounded-full  ${
                            dark ? "left-full -translate-x-full bg-white" : "left-0 bg-primary"
                        }`}
                    >
                        <i
                            className={`${
                                dark
                                    ? "fa-solid fa-moon text-primary"
                                    : "fa-solid fa-sun text-white"
                            }`}
                        ></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
