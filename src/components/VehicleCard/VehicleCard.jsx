import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VehicleCard.module.css";
import location from "../../images/vector/Vector.svg";
import star from "../../images/vector/star.svg";
import starEmpty from "../../images/vector/emptystar.svg";
import emptyheart from "../../images/vector/emptyheart.svg";
import likedheart from "../../images/vector/likedHearth.svg";
import Button from "../Button/Button.jsx";
import AC from "../../images/vector/Vector.svg";
import Kitchen from "../../images/vector/kitchen.svg";
import auto from "../../images/vector/automatic.svg";
import petrol from "../../images/vector/fuel-pump.svg";

function VehicleCard({ vehicle }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          <img src={star} alt="star" />
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className={styles.starHalf}>
          <img src={star} alt="half star" />
        </span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className={styles.starEmpty}>
          <img src={starEmpty} alt="empty star" />
        </span>
      );
    }

    return stars;
  };

  const featureIcons = {
    AC: AC,
    Kitchen: Kitchen,
    Automatic: auto,
    Petrol: petrol,
  };

  return (
    <div className={styles.vehicleCard}>
      <div className={styles.imageContainer}>
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className={styles.vehicleImage}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <div className={styles.cardHeader}>
            <h3 className={styles.vehicleName}>{vehicle.name}</h3>
            <div className={styles.priceContainer}>
              <span className={styles.price}>{vehicle.price}</span>
            <button 
              className={`${styles.favoriteBtn} ${isLiked ? styles.liked : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <img src={isLiked ? likedheart : emptyheart} alt="like" />
            </button>
            </div>
          </div>

          <div className={styles.ratingLocationRow}>
            <div className={styles.ratingContainer}>
              <div className={styles.stars}>{renderStars(vehicle.rating)}</div>
              <span className={styles.reviewCount}>
                ({vehicle.reviews} Reviews)
              </span>
            </div>

            <div className={styles.location}>
              <img src={location} alt="location" /> {vehicle.location}
            </div>
          </div>
        </div>

        <div className={styles.cardMiddle}>
          <p className={styles.description}>{vehicle.description}</p>

          <div className={styles.features}>
            {vehicle.features.map((feature, index) => (
              <span key={index} className={styles.feature}>
                {featureIcons[feature] && (
                  <img
                    src={featureIcons[feature]}
                    alt={feature}
                    className={styles.featureIcon}
                  />
                )}
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.cardBottom}>
          <Button 
            text="Show More" 
            className="showMoreCard" 
            onClick={() => navigate(`/camper/${vehicle.id}`)}
          />
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
