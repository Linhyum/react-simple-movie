const fetcher = (...args) => fetch(...args).then((res) => res.json());
const getMovieList = (type1 = "", type2 = "", type3 = "") =>
    `https://api.themoviedb.org/3${type3}/movie/${type1}${type2}?api_key=9e4dcf244e30611641c2a44c752a2353`;
const getImg = (type) => `https://image.tmdb.org/t/p/original${type}`;
export { fetcher, getMovieList, getImg };
