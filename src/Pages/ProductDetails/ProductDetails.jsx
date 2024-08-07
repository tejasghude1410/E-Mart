import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/product/'+ id);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="product-detail">
      <div className="product-images">
        <img src={product.imgpath} alt={product.name} className="main-image" />
       
      </div>
      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        <div className="product-prices">
          <span className="offer-price">₹{product.offerPrice}</span>
          <span className="mrp-price">₹{product.mrpPrice}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
        <button className="buy-now-button">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductDetails;
