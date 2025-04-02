import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addproduct.css"

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    originalPrice: "",
    discountPrice: "",
    productName: "",
    date: "",
    description: "",
    image: null,
  });

  // Handle form input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to add product");

      alert("Product added successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <div className="add-product-page">
        <div className="top-bar">
          <button className="back-button" onClick={() => navigate(-1)}>←</button>
        </div>
        <div className="container">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <input type="number" name="originalPrice" placeholder="Original Price" onChange={handleChange} required />
            <input type="number" name="discountPrice" placeholder="Discount Price" onChange={handleChange} required />
            <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required />
            <input type="date" name="date" placeholder="Date" onChange={handleChange} required />
            <textarea name="description" placeholder="Product Description" onChange={handleChange} required />
            <input type="file" name="image" onChange={handleChange} required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
