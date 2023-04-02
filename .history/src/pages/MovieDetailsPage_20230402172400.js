import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, getImg, getMovieList } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import MovieCard from "../components/movie/MovieCard";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination, Autoplay]);
const MovieDetailsPage = () => {
    const { slug } = useParams();
    const { data } = useSWR(getMovieList(slug), fetcher);
    if (!data) return null;
    return (
        <div className="page-container ">
            <div className="w-full h-[600px] relative">
                <div className="overlay absolute inset-0 bg-black bg-opacity-25"></div>
                <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                    }}
                ></div>
            </div>
            <div className="w-full max-w-[800px] mx-auto h-[400px] relative -mt-[200px] z-10">
                <img
                    src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                    className="w-full h-full object-cover rounded-3xl"
                    alt=""
                />
            </div>
            <h1 className="text-center text-4xl font-bold my-10">{data.title}</h1>
            {data.genres.length > 0 && (
                <div className="flex items-center justify-center mx-auto w-full max-w-[800px] flex-wrap gap-8 mb-10">
                    {data.genres.map((item) => (
                        <span
                            className="px-10 hover:bg-primary hover: transition-all py-3 text-xl bg-transparent border border-primary text-primary rounded-full cursor-pointer"
                            key={item.id}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            )}
            <p className="w-full max-w-[800px] mx-auto text-center text-lg mb-20">
                {data.overview}
            </p>
            <MovieMeta type={"/credits"}></MovieMeta>
            <MovieMeta type={"/videos"}></MovieMeta>
            <MovieMeta type={"/similar"}></MovieMeta>
        </div>
    );
};

function MovieMeta({ type = "/videos" }) {
    const { slug } = useParams();
    const { data } = useSWR(getMovieList(slug, type), fetcher);
    if (!data) return null;

    if (type === "/credits") {
        const { cast } = data;
        if (!cast || cast.length <= 0) return null;
        return (
            <div className="mb-20">
                <h2 className="text-center text-3xl font-bold mb-10">Casts</h2>
                <div className="grid moive-page sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                    {cast.slice(0, 4).map((item) => (
                        <div
                            key={item.id}
                            className="cast-item relative group overflow-hidden rounded-lg"
                        >
                            <img
                                className="w-full h-[350px] object-cover group-hover:scale-125 transition-all"
                                src={getImg(item.profile_path)}
                                alt=""
                            />
                            <h3 className="absolute w-full text-center bottom-5 text-2xl group-hover:text-primary transition-all font-semibold">
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (type === "/videos") {
        const { results } = data;
        if (!results || results.length <= 0) return null;
        return (
            <div className="mb-20">
                <h2 className="font-bold text-3xl mb-5">Trailers:</h2>
                <div className="aspect-video w-full max-w-[800px] mx-auto">
                    <iframe
                        width="768"
                        height="432"
                        src={`https://www.youtube.com/embed/${results[0].key}`}
                        title={results[0].name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full object-fill"
                    ></iframe>
                </div>
            </div>
        );
    }
    if (type === "/similar") {
        const { results } = data;
        if (!results || results.length <= 0) return null;
        return (
            <div className="movie-list mb-20">
                <h2 className="text-3xl font-bold mb-10">Similar movies:</h2>
                <div className="movie-list">
                    <Swiper
                        grabCursor={"true"}
                        spaceBetween={30}
                        slidesPerView={4}
                        navigation={{
                            prevEl: ".swiper-button-prev",
                            nextEl: ".swiper-button-next",
                        }}
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
                        {results.map((item) => (
                            <SwiperSlide key={item.id}>
                                <MovieCard info={item}></MovieCard>
                            </SwiperSlide>
                        ))}
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </Swiper>
                </div>
            </div>
        );
    }
}

export default MovieDetailsPage;
