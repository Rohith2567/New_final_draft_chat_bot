// src/pages/Cart.js
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Create similar styling to Home.css
import { useWishlist } from "./WishlistContext";

// import { products } from "./products";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const { wishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch products from backend
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/products");
            if (!response.ok) throw new Error("Failed to fetch products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleProductClick = (id) => {
        navigate(`/detail/${id}`);
    };

    // Filter products that are in wishlist
    const wishlistProducts = products.filter(product => wishlist[product._id]);

    return (
        <div className="product-container">
            <h1 className="dashboard-title2">WISHLIST</h1>
            <div className="product-list">
                {wishlistProducts.length === 0 ? (
                    <p>No products in wishlist</p>
                ) : (
                    wishlistProducts.map(product => (
                        <div className="product-card" key={product._id}>
                            {/* Product Image */}
                            <div className="image-container">
                                <img
                                    src={`http://localhost:5000/uploads/${product.image}`}
                                    alt={product.productName}
                                    className="product-image"
                                    onClick={() => handleProductClick(product._id)}
                                // height={150}
                                />
                                {/* Remove Icon (replacing Wishlist Icon) */}
                                <div
                                    className="wishlist-icon"
                                    onClick={() => toggleWishlist(product._id)}
                                >
                                    ❌
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="product-details" onClick={() => handleProductClick(product._id)}>
                                <div className="price-container">
                                    <div className="price">₹ {product.originalPrice.toLocaleString()}</div>
                                </div>

                                <div className="product-title">{product.productName}</div>

                                {/* Location and Date Inside the Box */}
                                <div className="location-date-container">
                                    <p className="location">{product.location}</p>
                                    <p className="date">{product.date}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cart;