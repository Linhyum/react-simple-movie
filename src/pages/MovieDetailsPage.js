import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, getImg, getMovieList } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import MovieCard from "../components/movie/MovieCard";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import { useEffect } from "react";
SwiperCore.use([Navigation, Pagination, Autoplay]);
const MovieDetailsPage = () => {
    const { slug } = useParams();
    const { data } = useSWR(getMovieList(slug), fetcher);
    //https://api.themoviedb.org/3/movie/${slug}api_key=9e4dcf244e30611641c2a44c752a2353
    useEffect(() => {
        document.title = data?.title || "Movie app";
    }, [data?.title]);
    if (!data) return null;
    return (
        <div className="page-container ">
            <div className="w-full h-[600px] relative">
                <div className="absolute inset-0 bg-black bg-opacity-25 overlay"></div>
                <div
                    className="w-full h-full bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                    }}
                ></div>
            </div>
            <div className="w-full max-w-[800px] mx-auto h-[400px] relative -mt-[200px] z-10">
                <img
                    src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                    className="object-cover w-full h-full rounded-3xl"
                    alt=""
                />
            </div>
            <h1 className="my-10 text-4xl font-bold text-center">{data.title}</h1>
            {data.genres.length > 0 && (
                <div className="flex items-center justify-center mx-auto w-full max-w-[800px] flex-wrap gap-8 mb-10">
                    {data.genres.map((item) => (
                        <span
                            className="px-10 py-3 text-xl transition-all bg-transparent border rounded-full cursor-pointer hover:bg-primary hover:text-white border-primary text-primary"
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
                <h2 className="mb-10 text-3xl font-bold text-center">Casts</h2>
                <div className="grid gap-5 moive-page sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {cast.slice(0, 4).map((item) => (
                        <div
                            key={item.id}
                            className="relative overflow-hidden rounded-lg cast-item group"
                        >
                            <img
                                className="w-full h-[350px] object-cover group-hover:scale-125 transition-all"
                                src={getImg(item.profile_path)}
                                alt=""
                            />
                            <h3 className="absolute w-full text-2xl font-semibold text-center text-white transition-all bottom-5 group-hover:text-primary">
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
                <h2 className="mb-5 text-3xl font-bold">Trailers:</h2>
                <div className="aspect-video w-full max-w-[800px] mx-auto">
                    <iframe
                        width="768"
                        height="432"
                        src={`https://www.youtube.com/embed/${results[0].key}`}
                        title={results[0].name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="object-fill w-full h-full"
                    ></iframe>
                </div>
            </div>
        );
    }
    if (type === "/similar") {
        const { results } = data;
        if (!results || results.length <= 0) return null;
        return (
            <div className="mb-20 movie-list">
                <h2 className="mb-10 text-3xl font-bold">Similar movies:</h2>
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
