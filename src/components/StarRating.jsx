import React, { useState } from "react";
import "../styles/StarRating.scss";


const StarRating = (itemRating, starSize) => {
  const [rating, setRating] = useState(itemRating);
  const [hover, setHover] = useState(0);
  return (
    <div className="starRating" style={{ fontSize: starSize }}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
