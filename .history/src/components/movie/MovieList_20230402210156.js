import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, getMovieList } from "../../config";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination, Autoplay]);
//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>
//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>
let slidesPerView = 0;
const MovieList = ({ type }) => {
    const { data, isLoading } = useSWR(getMovieList(type), fetcher);
    const movies = data?.results || [];
    return (
        <div className="movie-list">
            <Swiper
                navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
                spaceBetween={30}
                slidesPerView={slidesPerView}
                grabCursor={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1536: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                    },
                }}
            >
                {!isLoading && (
                    <div className="grid grid-cols-4 gap-x-8">
                        <MovieCardSkeleton></MovieCardSkeleton>
                        <MovieCardSkeleton></MovieCardSkeleton>
                        <MovieCardSkeleton></MovieCardSkeleton>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </div>
                )}
                <p>dwefewfwefewnjjjjjj</p>
                {isLoading &&
                    movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard info={item}></MovieCard>
                        </SwiperSlide>
                    ))}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </Swiper>
        </div>
    );
};

export default MovieList;
