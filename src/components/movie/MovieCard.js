import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

import { getImg } from "../../config";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../LoadingSkeleton";
const MovieCard = ({ info }) => {
    const navigate = useNavigate();
    return (
        <div className="p-3 transition-all duration-300 bg-gray-200 rounded-lg select-none movie-card hover:shadow-lg hover:shadow-primary">
            <img
                src={getImg(info.poster_path)}
                alt=""
                className="object-cover w-full h-[350px] rounded-lg mb-5"
            />
            <h3 title={info.title} className="mb-3 text-xl font-bold truncate">
                {info.title}
            </h3>
            <div className="flex items-center justify-between text-sm mb-7">
                <span className="opacity-50">{new Date(info.release_date).getFullYear()}</span>
                <div className="flex items-center gap-x-2">
                    <span className="opacity-50">{info.vote_average.toFixed(1)}</span>
                    <div className="text-yellow-400">
                        <i className="fa-solid fa-star"></i>
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
        <div className="p-3 text-white transition-all duration-300 rounded-lg select-none movie-card hover:shadow-lg hover:shadow-primary bg-slate-800">
            <LoadingSkeleton height="300px" radius="8px"></LoadingSkeleton>
            <div className="my-6">
                <LoadingSkeleton height="30px" radius="8px"></LoadingSkeleton>
            </div>
            <div className="flex items-center justify-between mt-6 mb-6 text-sm">
                <LoadingSkeleton height="30px" width="60px" radius="8px"></LoadingSkeleton>
                <div className="flex items-center gap-x-2">
                    <LoadingSkeleton height="30px" width="60px" radius="8px"></LoadingSkeleton>
                </div>
            </div>
            <div className="flex items-center justify-center w-full py-3 text-xl font-bold text-white rounded-lg gap-x-3">
                <LoadingSkeleton height="60px" radius="8px"></LoadingSkeleton>
            </div>
        </div>
    );
}
