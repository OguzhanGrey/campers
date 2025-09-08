import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Catolog.module.css";
import Header from "../../components/Header/Header";
import FilterBar from "../../components/FilterBar/FilterBar";
import LocationInput from "../../components/LocationInput/LocationInput";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import Button from "../../components/Button/Button";
import { fetchCampers, loadMoreItems } from "../../redux/slices/campersSlice";
import Loader from "../../components/Loader/Loader";

function CatalogPage() {
  const dispatch = useDispatch();
  const {
    displayedItems: vehicles,
    loading,
    error,
    hasMoreItems,
  } = useSelector((state) => state.campers);

  useEffect(() => {
    document.title = "Catalog - Campers of your dreams";
  }, []);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const formatVehicleData = (vehicle) => {
    const features = [];

    if (vehicle.AC) features.push("AC");
    if (vehicle.bathroom) features.push("Bathroom");
    if (vehicle.kitchen) features.push("Kitchen");
    if (vehicle.TV) features.push("TV");
    if (vehicle.radio) features.push("Radio");
    if (vehicle.refrigerator) features.push("Refrigerator");
    if (vehicle.microwave) features.push("Microwave");
    if (vehicle.gas) features.push("Gas");
    if (vehicle.water) features.push("Water");

    if (vehicle.transmission) features.push(vehicle.transmission);
    if (vehicle.engine) features.push(vehicle.engine);

    return {
      id: vehicle.id,
      name: vehicle.name,
      price: `€${vehicle.price.toLocaleString()}`,
      rating: vehicle.rating,
      reviews: vehicle.reviews ? vehicle.reviews.length : 0,
      location: vehicle.location,
      description: vehicle.description,
      features: features.slice(0, 6),
      image:
        vehicle.gallery && vehicle.gallery[0]
          ? vehicle.gallery[0].original
          : "/src/images/bg/Picture.png",
    };
  };

  if (loading) {
    return (
      <div className={styles.catalogPage}>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.leftSidebar}>
            <LocationInput />
            <FilterBar />
          </div>
          <div className={styles.rightContent}>
            <Loader size="large" text="Loading campers..." />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.catalogPage}>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.leftSidebar}>
            <LocationInput />
            <FilterBar />
          </div>
          <div className={styles.rightContent}>
            <div className={styles.errorContainer}>
              <div className={styles.errorText}>
                Error loading campers: {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.catalogPage}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.leftSidebar}>
          <LocationInput />
          <FilterBar />
        </div>
        <div className={styles.rightContent}>
          <div className={styles.vehicleGrid}>
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={formatVehicleData(vehicle)}
              />
            ))}
          </div>
          {hasMoreItems && (
            <div className={styles.loadMoreContainer}>
              <Button
                text="Load more"
                customType="secondary"
                onClick={() => dispatch(loadMoreItems())}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
