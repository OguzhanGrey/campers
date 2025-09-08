import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes.js";
import Footer from "./components/Footer/Footer";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const CatalogPage = lazy(() => import("./pages/CatologPage/Catolog"));
const CamperDetailPage = lazy(() =>
  import("./pages/CamperDetailPage/CamperDetail")
);

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={routes.home} element={<MainPage />} />
          <Route path={routes.catalog} element={<CatalogPage />} />
          <Route path={routes.camperDetail} element={<CamperDetailPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
