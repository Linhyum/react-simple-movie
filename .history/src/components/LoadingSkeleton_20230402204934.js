import React from "react";

const LoadingSkeleton = () => {
    return (
        <div>
            <div
                aria-label="loading-skeleton"
                className="w-full h-full bg-slate-200 animate-pulse"
            ></div>
        </div>
    );
};

export default LoadingSkeleton;
