// src/components/ProductList.js
import React, { useRef } from "react";
import "./ProductList.css";



const ProductList = ({products} :any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (event : any) => {
    event.preventDefault(); // Prevent the default link behavior

    // Open the link in a new tab
    chrome.tabs.update  ({ url: event.target.href });
  };

  return (
    <div className="products">
      <div className="product-list" ref={scrollContainerRef}>
          {products.map((product : any) => (
          <div className="product-item">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹ {product.price}</p>
              <a href={product.url} className="buy-now" onClick={handleClick}>
                Buy Now ↗
              </a>
            </div>
          </div>
        ))}
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
      <div className="scroll-buttons">
          <div className="scroll-button" onClick={scrollLeft}>
            &lt;
          </div>
          <div className="scroll-button" onClick={scrollRight}>
            &gt;
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductList;
