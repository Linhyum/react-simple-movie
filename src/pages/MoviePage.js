import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, getMovieList } from "../config";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
const itemsPerPage = 20;
const MoviePage = () => {
    const [nextPage, setNextPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState("");
    const input = useRef(null);
    const handleFilterChange = () => {
        setFilter(input.current.value);
    };
    const { data, isLoading } = useSWR(url, fetcher);
    //`https://api.themoviedb.org/3/search/movie/?api_key=9e4dcf244e30611641c2a44c752a2353`
    useEffect(() => {
        if (filter) {
            setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=9e4dcf244e30611641c2a44c752a2353&query=${filter}&page=${nextPage}`
            );
        } else {
            setUrl(`${getMovieList("popular")}&page=${nextPage}`);
        }
    }, [filter, nextPage]);
    const movies = data?.results || [];

    //pagination
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);

    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(e.selected + 1);
    };

    return (
        <div className="page-container ">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex mb-10 rounded-lg overflow-hidden"
            >
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full p-4 bg-slate-800 outline-none "
                        placeholder="Type here to search..."
                        ref={input}
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleFilterChange}
                    className="py-4 px-5 bg-primary "
                >
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            {isLoading && (
                <div className="grid grid-cols-4 gap-x-8">
                    {new Array(itemsPerPage).fill(0).map(() => (
                        <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
                    ))}
                </div>
            )}
            {!isLoading && (
                <div className="moive-page grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-20">
                    {movies.length > 0 &&
                        movies.map((item) => <MovieCard key={item.id} info={item}></MovieCard>)}
                </div>
            )}
            <div className="my-10">
                <ReactPaginate
                    pageCount={pageCount} // Tổng số trang
                    marginPagesDisplayed={1} // Số lượng trang được hiển thị trước và sau trang hiện tại
                    pageRangeDisplayed={1} // Số lượng trang được hiển thị trong phân đoạn paginate
                    breakLabel="..."
                    nextLabel={<i class="fa-solid fa-chevron-right"></i>}
                    onPageChange={handlePageClick}
                    previousLabel={<i class="fa-solid fa-chevron-left"></i>}
                    renderOnZeroPageCount={null}
                    containerClassName={"pagination"} // Class cho container của paginate
                    activeClassName={"active"} // Class cho trang hiện tại
                />
            </div>
        </div>
    );
};

export default MoviePage;
