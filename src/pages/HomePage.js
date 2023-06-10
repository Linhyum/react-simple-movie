import React from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";
import { useEffect } from "react";

const HomePage = () => {
    return (
        <>
            <Banner></Banner>
            <section className="pb-20 movies-layout page-container">
                <h2 className="mb-10 text-3xl font-bold capitalize">Now playing</h2>
                <MovieList type={"now_playing"}></MovieList>
            </section>

            <section className="pb-20 movies-layout page-container">
                <h2 className="mb-10 text-3xl font-bold capitalize">Top Rated</h2>
                <MovieList type={"top_rated"}></MovieList>
            </section>

            <section className="pb-20 movies-layout page-container">
                <h2 className="mb-10 text-3xl font-bold capitalize">Trending</h2>
                <MovieList type={"popular"}></MovieList>
            </section>
        </>
    );
};

export default HomePage;
