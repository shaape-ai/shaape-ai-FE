import React from "react";
import "./chiccheckrating.css";
import Tooltip from '@mui/material/Tooltip';

function ChicCheckRating({ rating, text }: { rating: any, text: string }) {
  const ratingPercentage = `${rating * 3.6}deg`;

  return (
    <div className="chic-check-container">
      <div className="chic-check-row-header">
        <div className="chic-check-header">ChicCheck</div>
        <Tooltip title="ChicCheck rates how well a garment fits your size and style preferences. A high score means it’s a great match for you—shop confidently and in style!">
          <div className="info-icon-chic-check">i</div>  
        </Tooltip>
      </div>

      <div
        className="chic-check-rating"
        style={
          { "--rating-percentage": ratingPercentage } as React.CSSProperties
        }
      >
        <div className="chic-check-inner-circle">
          <div className="chic-check-percent">{rating}%</div>
        </div>
      </div>
      <div className="chic-check-text">
        {text}
      </div>
    </div>
  );
}

export default ChicCheckRating;
