import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Product.css';
import { useNavigate } from 'react-router-dom';
import db from '../../data/db'; // Import your database or mock data

const ProductCard = ({
  id,
  imgpath,
  prodName,
  prodDisc,
  prodPoints,
  prodLongDesc,
  prodShortDesc,
  offerPrice,
  mrpPrice,
  onViewProduct
}) => {
  const [showLongDesc, setShowLongDesc] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (localStorage.getItem("islogin") === "true") {
      const cart = {
        prodID: id,
        custID: localStorage.getItem("custId"),
        qty: 1
      };

      fetch("http://localhost:8080/api/Cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Cart data couldn't be sent.");
          }
          alert("Added to Cart successfully.");
        })
        .catch((error) => {
          alert("Item Already added in the cart");
        });

      return;
    }

    navigate('/login');
  };

  const toggleLongDesc = () => {
    setShowLongDesc(!showLongDesc);
  };

  return (
    <div className="product-card">
      <img src={imgpath} alt={prodName} className="product-image" />
      <h3 className="product-name">{prodName}</h3>
      {showLongDesc ? (
        <p className="product-long-desc">{prodLongDesc}</p>
      ) : (
        <p className="product-short-desc">{prodShortDesc}</p>
      )}
      <div className="product-prices">
        <span className="product-mrp-price">MRP - ₹{mrpPrice}</span>
        <span className="product-offer-price">₹{offerPrice}</span>
        {prodPoints > 0 && (
          <>
            <span className='product-points'>Points - {prodPoints}</span>
            <span className='product-discount'>Discount - {prodDisc === 0 ? "100%" : `${prodDisc}%`}</span>
          </>
        )}
      </div>
      {prodLongDesc && (
        <p className="show-more" onClick={toggleLongDesc}>
          {showLongDesc ? 'Show Less' : 'Show More'}
        </p>
      )}
      <div className="product-buttons">
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="view-product-button" onClick={() => onViewProduct(id)}>
          View Product
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  imgpath: PropTypes.string.isRequired,
  prodName: PropTypes.string.isRequired,
  prodDisc: PropTypes.number,
  prodPoints: PropTypes.number,
  prodLongDesc: PropTypes.string.isRequired,
  prodShortDesc: PropTypes.string.isRequired,
  offerPrice: PropTypes.number.isRequired,
  mrpPrice: PropTypes.number.isRequired,
  onViewProduct: PropTypes.func.isRequired
};

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewProduct = (id) => {
    const product = db.find(p => p.id === id);
    setSelectedProduct(product);
  };

  return (
    <div className="container">
      {selectedProduct && (
        <div className="detail-container">
          <div className="detail-content">
            <button className="close" onClick={() => setSelectedProduct(null)}>
              <GrFormClose />
            </button>

            {selectedProduct && (
              <div className="detail-info">
                <div className="img-card">
                  <img src={selectedProduct.imgpath} alt={selectedProduct.prodName} />
                </div>
                <div className="product-detail">
                  <h2 className="modal-title">{selectedProduct.prodName}</h2>
                  <h3 className="modal-price">£ {selectedProduct.offerPrice}</h3>
                  <p className="modal-desc">{selectedProduct.prodLongDesc}</p>
                  <button>Add To Cart</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <h1>Product List</h1>
      <section className="product-list">
        {db.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            imgpath={product.imgpath}
            prodName={product.prodName}
            prodDisc={product.prodDisc}
            prodPoints={product.prodPoints}
            prodLongDesc={product.prodLongDesc}
            prodShortDesc={product.prodShortDesc}
            offerPrice={product.offerPrice}
            mrpPrice={product.mrpPrice}
            onViewProduct={handleViewProduct}
          />
        ))}
      </section>
    </div>
  );
};

export default Product;
