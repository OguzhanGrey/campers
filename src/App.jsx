import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes.js";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={routes.home} element={<MainPage />} />
          <Route path={routes.catalog} element={<MainPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
