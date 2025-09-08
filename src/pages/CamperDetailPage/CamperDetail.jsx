import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { fetchCampers } from "../../redux/slices/campersSlice";
import styles from "./CamperDetail.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import BookForm from "../../components/BookForm/BookForm";
import location from "../../images/vector/Vector.svg";
import water from "../../images/vector/ion_water-outline.svg";
import coffee from "../../images/vector/coffee.svg";
import gas from "../../images/vector/hugeicons_gas-stove.svg";
import microwave from "../../images/vector/lucide_microwave.svg";
import shower from "../../images/vector/shower.svg";
import auto from "../../images/vector/automatic.svg";
import fridge from "../../images/vector/solar_fridge-outline.svg";
import radios from "../../images/vector/ui-radios.svg";
import AC from "../../images/vector/wind.svg";
import petrol from "../../images/vector/fuel-pump.svg";
import tv from "../../images/vector/tv.svg";

function CamperDetail() {
  const categoriesicons = {
    TV: tv,
    Water: water,
    Kitchen: coffee,
    Gas: gas,
    Microwave: microwave,
    Bathroom: shower,
    Automatic: auto,
    Refrigerator: fridge,
    Radio: radios,
    AC: AC,
    Petrol: petrol,
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.campers);
  const [activeTab, setActiveTab] = useState("features");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchCampers());
    }
  }, [dispatch, items.length]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const camper = items.find((item) => item.id === id);

  if (loading) {
    return (
      <div className={styles.detailPage}>
        <Header />
        <div className={styles.mainContent}>
          <Loader size="large" text="Loading camper details..." />
        </div>
      </div>
    );
  }

  if (error || !camper) {
    return (
      <div className={styles.detailPage}>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.errorContainer}>
            <h2>Camper not found</h2>
            <p>The camper you're looking for doesn't exist.</p>
            <Button
              text="Back to Catalog"
              onClick={() => window.history.back()}
            />
          </div>
        </div>
      </div>
    );
  }

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

    if (vehicle.transmission) features.push("Automatic");
    if (vehicle.engine) features.push("Petrol");

    return {
      id: vehicle.id,
      name: vehicle.name,
      price: `€${vehicle.price.toLocaleString()}`,
      rating: vehicle.rating,
      reviewCount: vehicle.reviews ? vehicle.reviews.length : 0,
      location: vehicle.location,
      description: vehicle.description,
      features: features.slice(0, 8),
      images: vehicle.gallery || [],
      form: vehicle.form,
      length: vehicle.length,
      width: vehicle.width,
      height: vehicle.height,
      tank: vehicle.tank,
      consumption: vehicle.consumption,
      reviews: vehicle.reviews || [],
    };
  };

  const formattedCamper = formatVehicleData(camper);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className={styles.starHalf}>
          ☆
        </span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className={styles.starEmpty}>
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className={styles.detailPage}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.topSection}>
          <div className={styles.camperInfo}>
            <div className={styles.titleSection}>
              <h1 className={styles.camperName}>{formattedCamper.name}</h1>
              <div className={styles.ratingLocation}>
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {renderStars(formattedCamper.rating)}
                  </div>
                  <span className={styles.ratingText}>
                    {formattedCamper.rating} ({formattedCamper.reviewCount}{" "}
                    Reviews)
                  </span>
                </div>
                <div className={styles.location}>
                  <img src={location} alt="location" />
                  {formattedCamper.location}
                </div>
              </div>
              <div className={styles.price}>{formattedCamper.price}</div>
            </div>

            <div className={styles.imageGallery}>
              {formattedCamper.images.slice(0, 4).map((image, index) => (
                <div 
                  key={index} 
                  className={styles.galleryImage}
                  onClick={() => openModal(image)}
                >
                  <img
                    src={image.original}
                    alt={`${formattedCamper.name} ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className={styles.description}>
              <p>{formattedCamper.description}</p>
            </div>

            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${
                  activeTab === "features" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("features")}
              >
                Features
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === "reviews" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.leftBottom}>
            <div className={styles.tabContent}>
              {activeTab === "features" && (
                <>
                  <div className={styles.featuresGrid}>
                    {formattedCamper.features.map((feature, index) => (
                      <div key={index} className={styles.featureItem}>
                        <span className={styles.featureIcon}>
                          <img src={categoriesicons[feature]} alt={feature} />
                        </span>
                        <span className={styles.featureName}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.vehicleDetails}>
                    <h3>Vehicle details</h3>
                    <div className={styles.detailsGrid}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Form:</span>
                        <span className={styles.detailValue}>
                          {formattedCamper.form}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Length:</span>
                        <span className={styles.detailValue}>
                          {formattedCamper.length}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Width:</span>
                        <span className={styles.detailValue}>
                          {formattedCamper.width}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Height:</span>
                        <span className={styles.detailValue}>
                          {formattedCamper.height}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Tank:</span>
                        <span className={styles.detailValue}>
                          {formattedCamper.tank}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Consumption:</span>
                        <span className={styles.detailValue}>
                          {formattedCamper.consumption}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "reviews" && (
                <div className={styles.reviewsList}>
                  {formattedCamper.reviews.map((review, index) => (
                    <div key={index} className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <span className={styles.reviewerName}>
                          {review.reviewer_name}
                        </span>
                        <div className={styles.reviewRating}>
                          {renderStars(review.reviewer_rating)}
                        </div>
                      </div>
                      <p className={styles.reviewComment}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.rightBottom}>
            <BookForm />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        contentLabel="Image Modal"
      >
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={closeModal}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {selectedImage && (
            <img
              src={selectedImage.original}
              alt="Full size"
              className={styles.modalImage}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CamperDetail;
