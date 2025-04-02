import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./DetailPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
// import { products } from "./products";

const DetailPage = () => {
  const API_BASE_URL = "http://127.0.0.1:5000";
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const [userId, setUserId] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages
  const [userMessage, setUserMessage] = useState(""); // User's input message
  const [showChat, setShowChat] = useState(false); // Toggle chatbot visibility
  const [isRecording, setIsRecording] = useState(false);

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

      console.log(id)
      console.log(typeof (id))

      // Find the product based on id after products are fetched
      const foundProduct = data.find((item) => item._id === id);
      setProduct(foundProduct || null);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const navigate = useNavigate();

  // Start chat session with prices from the fetched products
  const startChat = async () => {
    if (products.length === 0) {
      alert("No products available to start the chat");
      return;
    }

    const firstProduct = product;
    const { originalPrice, discountPrice } = firstProduct;

    console.log(originalPrice, " ", discountPrice)

    try {
      await axios.post(`${API_BASE_URL}/start_chat`, {
        user_id: 12345,
        initial_price: originalPrice,
        max_discount_price: discountPrice,
      });


      setChatStarted(true);
    } catch (error) {
      alert("Error starting chat");
    }
  };

  // Handle sending a message to the chatbot
  const sendMessage = async (message) => {
    setUserMessage(" ");
    if (!message.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { role: "user", message }
    ]);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        user_id: 12345,
        message,
      });

      const { reply } = response.data;

      setChatMessages((prev) => [
        ...prev,
        { role: "bot", message: reply }
      ]);
    } catch (error) {
      alert("Error sending message");
    }
  };

  // Speech-to-Text functionality
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setUserMessage(transcript); // Set the transcribed message to userMessage
  };

  const startRecording = () => {
    setIsRecording(true);
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
  };

  // End chat session
  const endChat = async () => {
    try {
      await axios.post(`${API_BASE_URL}/end_chat`, {
        user_id: 12345,
      });
      setChatStarted(false);
      setShowChat(false);
      setChatMessages([]);
    } catch (error) {
      alert("Error ending chat");
    }
  };

  // Toggle Wishlist (Add/Remove from cart)
  // const toggleWishlist = (product) => {
  //   if (cart.includes(product)) {
  //     setCart(cart.filter((item) => item !== product));
  //   } else {
  //     setCart([...cart, product]);
  //   }
  // };

  // Navigate to Chatbot page when the bot icon is clicked
  const handleBotClick = () => {
    setShowChat(!showChat);
    if (!chatStarted) {
      startChat();
    }
  };

  const user_id = 12345;  // Replace with actual user ID
  const final_price = product ? product.originalPrice : 0; // Ensure price is available

  const handlePayment = () => {
    navigate(`/payment?user_id=${user_id}&price=${final_price}`);
  };

  if (!product) {
    return <h2>Product not found</h2>;
  }

  // ✅ WhatsApp link with pre-filled message
  const whatsappMessage = "Hello, I'm interested in your product: ${product.productName} priced at ₹${product.originalPrice}.";
  const whatsappLink = `https://wa.me/${product.phone}?text=${encodeURIComponent(whatsappMessage)}`;


  return (
    <div className="detail-container">
      {/* Left Column - Image */}
      <div className="image-column">
        <div className="image-container2">
          <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.productName} className="main-image" />
        </div>
      </div>

      {/* Right Column - Details */}
      <div className="details-column">
        <div className="product-header">
          <h1 className="product-title">{product.productName}</h1>
          {/* {product.variant && (
            <p className="product-variant">
              [{product.yearRange}] {product.variant}
            </p>
          )} */}
          {/* <div className="product-tags">
            {product.fuelType && <span className="tag">{product.fuelType}</span>}
            {product.mileage && <span className="tag">{product.mileage} KM</span>}
            {product.transmission && <span className="tag">{product.transmission}</span>}
          </div> */}
        </div>

        <div className="price-section">
          <h2 className="product-price">₹ {product.originalPrice.toLocaleString()}</h2>
          <button className="offer-button" onClick={handlePayment}>Make Payment</button>
        </div>

        <div className="divider"></div>

        <div className="overview-section">
          <h3>Overview</h3>
          <div className="overview-grid">
            <div className="overview-item">
              <span className="overview-label">Owner</span>
              <span className="overview-value">{product.owner || "1st"}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Location</span>
              <span className="overview-value">{product.location}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Posting date</span>
              <span className="overview-value">{product.date}</span>
            </div>
            <div className="overview-item">
              {/* <span className="overview-label">Seller number</span> */}
              {/* <button className="overview-button">{product.phone}</button> */}
              {/* ✅ WhatsApp Chat Button */}
              <button style={{ color: "white", backgroundColor: "#075E54"}}>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none" }}>
                  💬 Chat on WhatsApp
                </a>
              </button>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="description-section">
          <h3>Description</h3>
          <p>{product.description || "No description provided"}</p>
        </div>

        <div className="seller-section">
          <div className="seller-header">
            <h3>Seller</h3>
            <span className="seller-type">{product.name || product.productName + " Shop"}</span>
          </div>
          <button className="chat-button" onClick={handleBotClick}>Chat with Bot</button>
          <p className="seller-location">{product.location}</p>
          {/* {product.mapLocation && (
            <p className="map-coordinates">{product.mapLocation}</p>
          )}
          <button className="view-map-button">View larger map</button> */}
        </div>



        {/* Chat session control */}
        {/* {showChat && (
          <div className="chatbox-container">
            <div className="chatbox">
              <div className="chat-header">
                <span>Chatbot</span>
                <button onClick={endChat} className="end-chat-btn">
                  X
                </button>
              </div>

              <div className="chat-messages">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={message.role === "user" ? "user-msg" : "bot-msg"}
                  >
                    <strong>{message.role === "user" ? "You" : "Bot"}:</strong>
                    {message.role === "bot" ? (
                      <span dangerouslySetInnerHTML={{ __html: message.message }} />
                    ) : (
                      <span>{message.message}</span>
                    )}
                  </div>
                ))}
              </div>
              {!chatStarted ? (
                <button onClick={startChat} className="start-chat-btn">
                  Start Chat
                </button>
              ) : (
                <div className="chat-input-container">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message"
                    className="chat-input"
                  />

                  <button
                    onClick={() => sendMessage(userMessage)}
                    className="send-chat-btn"
                  >
                    Send
                  </button>

                  <div
                    className="speech-icon-container"
                    onClick={isRecording ? stopRecording : startRecording}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={isRecording ? faMicrophoneSlash : faMicrophone}
                      color={isRecording ? "red" : "green"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )} */}
        {showChat && (
          <div className="chatbox-container">
            <div className="chatbox">
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chatbox__image--header">
                  <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="User" />
                </div>
                <button onClick={endChat} className="end-chat-btn5">
                  X
                </button>
                <div className="chatbox__content--header">
                  <h4 className="chatbox__heading--header">Chat Support</h4>
                  <p className="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="chat-messages">
                {chatMessages.map((message, index) => (
                  <div key={index} className={message.role === "user" ? "user-msg" : "bot-msg"}>
                    <strong>{message.role === "user" ? "You" : "Bot"}:</strong>
                    {message.role === "bot" ? (
                      <span dangerouslySetInnerHTML={{ __html: message.message }} />
                    ) : (
                      <span>{message.message}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input Section */}
              {!chatStarted ? (
                <button onClick={startChat} className="start-chat-btn">
                  Start Chat
                </button>
              ) : (
                <div className="chatbox__footer">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message"
                    className="chat-input"
                  />

                  <div
                    className="speech-icon-container"
                    onClick={isRecording ? stopRecording : startRecording}
                    style={{
                      cursor: "pointer",
                      // position: "absolute",
                      // right: "10px",
                      // top: "50%",
                      // transform: "translateY(-50%)",
                    }}
                  >
                    <FontAwesomeIcon icon={isRecording ? faMicrophoneSlash : faMicrophone} color={isRecording ? "red" : "green"} />
                  </div>

                  <button onClick={() => sendMessage(userMessage)} className="send-chat-btn">
                    Send
                  </button>

                  {/* Speech Button - Icon inside input */}

                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
