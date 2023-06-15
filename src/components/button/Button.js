import React from "react";

const Button = ({ onclick, title }) => {
    return (
        <button
            onClick={onclick}
            className="py-3 text-white flex items-center justify-center gap-x-3 bg-primary rounded-lg w-full text-xl font-bold hover:opacity-90"
        >
            <span>{title}</span>
            <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center">
                <i className="fa-solid fa-play"></i>
            </div>
        </button>
    );
};

export default Button;
