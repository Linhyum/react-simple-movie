import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const Main = lazy(() => import("./components/layout/Main"));

function App() {
    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route element={<Main></Main>}>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                    <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
                    <Route
                        path="/movies/:slug"
                        element={<MovieDetailsPage></MovieDetailsPage>}
                    ></Route>
                    <Route path="*" element={<>404 NOT FOUND</>}></Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
