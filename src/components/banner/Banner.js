import React from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import { fetcher, getImg, getMovieList } from "../../config";
import { useNavigate } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination, Autoplay]);
const Banner = () => {
    const { data, isLoading } = useSWR(getMovieList("upcoming"), fetcher);
    const banners = data?.results || [];
    return (
        <section className="banner h-[600px] page-container mb-20 ">
            <Swiper
                navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                slidesPerView={1}
            >
                {!isLoading &&
                    banners.length > 0 &&
                    banners.map((item) => (
                        <SwiperSlide key={item.id}>
                            <BannerItem info={item}></BannerItem>
                        </SwiperSlide>
                    ))}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </Swiper>
        </section>
    );
};

const BannerItem = ({ info }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full rounded-lg relative text-white">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.2)] rounded-lg"></div>
            <img
                src={getImg(info.poster_path)}
                alt=""
                className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute left-5 bottom-5 w-full ">
                <h2 className="banner-title font-bold text-3xl mb-5">{info.title}</h2>
                <button
                    onClick={() => navigate(`/movies/${info.id}`)}
                    className="py-3 flex items-center justify-center gap-x-3 px-6 rounded-lg bg-primary text-xl  font-bold"
                >
                    <span>Watch Now</span>
                    <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center">
                        <i className="fa-solid fa-play"></i>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Banner;
