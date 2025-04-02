// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Fetch products from backend
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/products");
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Product Dashboard</h1>
//       <button className="add-btn" onClick={() => navigate("/add-product")}>
//         Add Product
//       </button>
//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           products.map((product, index) => (
//             <div key={index} className="product-card">
//               <img src={`http://127.0.0.1:8000/uploads/${product.image}`} alt={product.productName} />
//               <h3>{product.productName}</h3>
//               <p><strong>Price:</strong> ${product.originalPrice}</p>
//               <p><strong>Discount:</strong> ${product.discountPrice}</p>
//               <p><strong>Seller:</strong> {product.name}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

























// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Home.css"; 

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Fetch products from backend
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/products");
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Product Dashboard</h1>
//       <button className="add-btn" onClick={() => navigate("/add-product")}>
//         Add Product
//       </button>
//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           products.map((product, index) => (
//             <div key={index} className="product-card">
//               <div className="product-image">
//                 <img
//                   src={`http://127.0.0.1:8000/uploads/${product.image}`}
//                   alt={product.productName}
//                 />
//                 <div className="featured-badge">FEATURED</div>
//               </div>
//               <div className="product-details">
//                 <h2 className="price">₹ {product.originalPrice}</h2>
//                 {/* <p className="km-year">
//                   {product.year} - {product.kmDriven} km
//                 </p> */}
//                 <p className="product-name">{product.productName}</p>
//                 <p className="product-description">{product.description}</p>
//                 <p className="location">{product.location}</p>
//                 <p className="date">{product.date}</p>
//               </div>
//               <div className="wishlist">❤️</div> 
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Home.css"; 

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]); // Store selected products
//   const [isChatVisible, setIsChatVisible] = useState(false); // State to toggle chat visibility
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Fetch products from backend
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/products");
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // Toggle Wishlist (Add/Remove from cart)
//   const toggleWishlist = (product) => {
//     if (cart.includes(product)) {
//       setCart(cart.filter((item) => item !== product));
//     } else {
//       setCart([...cart, product]);
//     }
//   };

//   // Toggle chat visibility
//   const toggleChat = () => {
//     setIsChatVisible(!isChatVisible);
//   };

//   return (
//     <div className="container">
//       <h1>Product Dashboard</h1>
//       <button className="add-btn" onClick={() => navigate("/add-product")}>
//         Add Product
//       </button>
//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           products.map((product, index) => (
//             <div key={index} className="product-card">
//               <div className="product-image">
//                 <img
//                   src={`http://127.0.0.1:8000/uploads/${product.image}`}
//                   alt={product.productName}
//                 />
//                 <div className="featured-badge">FEATURED</div>
//                 <div className="bot-icon" onClick={toggleChat}>
//                   🤖
//                 </div> {/* Bot icon, onClick to toggle chat */}
//               </div>
//               <div className="product-details">
//                 <h2 className="price">₹ {product.originalPrice}</h2>
//                 <p className="product-name">{product.productName}</p>
//                 <p className="product-description">{product.description}</p>
//                 <p className="location">{product.location}</p>
//                 <p className="date">{product.date}</p>
//               </div>
//               <div
//                 className="wishlist"
//                 onClick={() => toggleWishlist(product)}
//               >
//                 {cart.includes(product) ? "❤️" : "🖤"}
//               </div> 
//             </div>
//           ))
//         )}
//       </div>

//       {/* Chatbot window */}
//       {isChatVisible && (
//         <div className="chatbot-container">
//           <div className="chatbot-header">
//             <h3>Chatbot</h3>
//             <button onClick={toggleChat}>Close</button>
//           </div>
//           <div className="chatbot-body">
//             <p>Chatbot Interaction goes here...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// ========================================================================================================

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Home.css";


// const Home = () => {
// const [userId, setUserId] = useState("");
// const [chatStarted, setChatStarted] = useState(false);
// const [products, setProducts] = useState([]);
// const [cart, setCart] = useState([]); // Store selected products
// const [chatMessages, setChatMessages] = useState([]); // Store chat messages
// const [userMessage, setUserMessage] = useState(""); // User's input message
// const [showChat, setShowChat] = useState(false); // Toggle chatbot visibility
// const navigate = useNavigate();

// useEffect(() => {
//   fetchProducts();
// }, []);

//  // Fetch products from backend
//    const fetchProducts = async () => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/products");
//     if (!response.ok) throw new Error("Failed to fetch products");
//     const data = await response.json();
//     setProducts(data);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };



//

//

//   // Toggle Wishlist (Add/Remove from cart)
//   const toggleWishlist = (product) => {
//     if (cart.includes(product)) {
//       setCart(cart.filter((item) => item !== product));
//     } else {
//       setCart([...cart, product]);
//     }
//   };

//   

// <div className="container">
//     <h1>Product Dashboard</h1>
//     <button className="add-btn" onClick={() => navigate("/add-product")}>
//       Add Product
//     </button>
//     <div className="product-list">
//       {products.length === 0 ? (
//         <p>No products available</p>
//       ) : (
//         products.map((product, index) => (
//           <div key={index} className="product-card">
//             <div className="product-image">
//               <img
//                 src={`http://127.0.0.1:8000/uploads/${product.image}`}
//                 alt={product.productName}
//               />
//               <div className="featured-badge">FEATURED</div>
//               <div className="bot-icon" onClick={handleBotClick}>
//                 🤖
//               </div>
//             </div>
//             <div className="product-details">
//               <h2 className="price">₹ {product.originalPrice}</h2>
//               <p className="product-name">{product.productName}</p>
//               <p className="product-description">{product.description}</p>
//               <p className="location">{product.location}</p>
//               <p className="date">{product.date}</p>
//             </div>
//             <div
//               className="wishlist"
//               onClick={() => toggleWishlist(product)}
//             >
//               {cart.includes(product) ? "❤️" : "🖤"}
//             </div>
//           </div>
//         ))
//       )}
//     </div>


//   return (
//     <div className="product-container">
//       <h1 className="dashboard-title">Product Dashboard</h1>
//       <button className="add-btn" onClick={() => navigate("/add-product")}>
//         Add Product
//       </button>

//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           products.map((product, index) => (
//             // <Link to="/details" state={{ data: product }} key={index}>
//             <div className="product-card">
//               {/* Product Image */}
//               <div className="image-container">
//                 <img
//                   src={`http://127.0.0.1:8000/uploads/${product.image}`}
//                   alt={product.productName}
//                   className="product-image"
//                 />
//                 {/* Wishlist Icon */}
//                 <div className="wishlist-icon">
//                   {cart.includes(product) ? "❤️" : "🤍"}
//                 </div>
//                 {/* Featured Badge */}
//                 <div className="featured-badge">FEATURED</div>
//               </div>

//               {/* Product Details */}
//               <div className="product-details">
//                 {/* Price & Bot Icon */}
//                 <div className="price-container">
//                   <h1 className="price">₹ {product.originalPrice}</h1>
//                   <div className="bot-icon" onClick={handleBotClick}>🤖</div>
//                 </div>

//                 <h1 className="product-title">{product.productName}</h1>
//                 <p className="product-description">{product.description}</p>

//                 {/* Location and Date Inside the Box */}
//                 <div className="location-date-container">
//                   <p className="location">{product.location}</p>
//                   <p className="date">{product.date}</p>
//                 </div>
//               </div>
//             </div>
//             // </Link>
//           ))
//         )}
//       </div>



//       {/* Chat session control */}
// {showChat && (
//   <div className="chatbox-container">
//     <div className="chatbox">
//       <div class="chatbox__support">
//         <div className="chat-header">
//           <div class="chatbox__image--header">
//             <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
//           </div>
//           {/* <span>Chatbot</span> */}
//           <button onClick={endChat} className="end-chat-btn">
//             X
//           </button>
//           <div class="chatbox__content--header">
//             <h4 class="chatbox__heading--header">Chat support</h4>
//             <p class="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
//           </div>
//         </div>
//         <div className="chat-messages">
//           {chatMessages.map((message, index) => (
//             <div
//               key={index}
//               className={message.role === "user" ? "user-msg" : "bot-msg"}
//             >
//               <strong>{message.role === "user" ? "You" : "Bot"}:</strong> {message.message}
//             </div>
//           ))}
//         </div>
//         {!chatStarted ? (
//           <button onClick={startChat} className="start-chat-btn">
//             Start Chat
//           </button>
//         ) : (
//           <div class="chatbox__footer">
//             <input
//               type="text"
//               value={userMessage}  // Bind the value to the userMessage state
//               onChange={(e) => setUserMessage(e.target.value)} // Update the state with input value
//               placeholder="Type your message"
//               className="chat-input"
//             />
//             <button onClick={sendMessage} className="send-chat-btn">
//               Send
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useWishlist } from "./WishlistContext";

// import { products } from "./products";

const Home = () => {
  // const [cart, setCart] = useState([]); // Store selected products
  const [userId, setUserId] = useState("");

  const [products, setProducts] = useState([]);
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages
  const [userMessage, setUserMessage] = useState(""); // User's input message
  const [showChat, setShowChat] = useState(false); // Toggle chatbot visibility
  const navigate = useNavigate();

  const { wishlist, toggleWishlist } = useWishlist();

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

  return (
    <>
      <button
        className="cart-btn"
        onClick={() => navigate("/cart")}
      >
        🛒 View Wishlist ({Object.keys(wishlist).length})
      </button>
      <div className="product-container">
        <h1 className="dashboard-title">Product Dashboard</h1>
        {/* <button className="add-btn" onClick={() => navigate("/add-product")}>
          Add Product
        </button> */}

        <div className="product-list">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((product) => (
              <div className="product-card" key={product._id}>
                {/* Product Image */}
                <div className="image-container">
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.productName}
                    className="product-image"
                    onClick={() => handleProductClick(product._id)}
                  />
                  {/* Wishlist Icon */}
                  <div
                    className="wishlist-icon"
                    onClick={() => toggleWishlist(product._id)}
                  >
                    {wishlist[product._id] ? "❤️" : "🤍"}
                  </div>
                  {/* Featured Badge */}
                  {/* <div className="featured-badge">FEATURED</div> */}
                </div>

                {/* Product Details */}
                <div className="product-details" onClick={() => handleProductClick(product._id)}>
                  <div className="price-container">
                    <div className="price">₹ {product.originalPrice}</div>
                    {/* <div className="bot-icon" onClick={handleBotClick}>🤖</div> */}
                  </div>

                  <div className="product-title">{product.productName}</div>
                  {/* <p className="product-description">{product.description}</p> */}

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
    </>
  );
};

export default Home;
