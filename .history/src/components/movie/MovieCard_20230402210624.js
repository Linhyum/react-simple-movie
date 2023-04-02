import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

import { getImg } from "../../config";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../LoadingSkeleton";
const MovieCard = ({ info }) => {
    const navigate = useNavigate();
    return (
        <div className="movie-card text-white hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-lg p-3 bg-slate-800 select-none">
            <img
                src={getImg(info.poster_path)}
                alt=""
                className="object-cover w-full h-[350px] rounded-lg mb-5"
            />
            <h3 title={info.title} className="text-xl font-bold mb-3 truncate">
                {info.title}
            </h3>
            <div className="flex items-center justify-between text-sm  mb-7">
                <span className="opacity-50">{new Date(info.release_date).getFullYear()}</span>
                <div className="flex items-center gap-x-2">
                    <span className="opacity-50">{info.vote_average.toFixed(1)}</span>
                    <div className="text-yellow-400">
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
            </div>
            <Button onclick={() => navigate(`/movies/${info.id}`)} title={"Watch now"}></Button>
        </div>
    );
};

function FallbackComponent() {
    return <p className="text-red-500 bg-red-200">Something went wrong with this component</p>;
}

export default withErrorBoundary(MovieCard, {
    FallbackComponent,
});

export function MovieCardSkeleton() {
    return (
        <div className="movie-card text-white hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-lg p-3 bg-slate-800 select-none">
            <LoadingSkeleton height="300px" radius="8px"></LoadingSkeleton>
            <div className="flex items-center justify-between text-sm mt-8  mb-7">
                <LoadingSkeleton height="30px" width="60px" radius="8px"></LoadingSkeleton>

                <div className="flex items-center gap-x-2">
                    <LoadingSkeleton height="30px" width="60px" radius="8px"></LoadingSkeleton>
                </div>
            </div>
            <button className="py-3 text-white flex items-center justify-center gap-x-3 bg-primary rounded-lg w-full text-xl font-bold hover:opacity-90">
                <LoadingSkeleton height="60px" radius="8px"></LoadingSkeleton>
            </button>
        </div>
    );
}
