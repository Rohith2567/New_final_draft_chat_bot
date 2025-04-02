// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import "./Payment.css";  // Styling

// const stripePromise = loadStripe("pk_test_51R6yLoQv1IMBu83xiZ4SB4CnYYJEXX9OhZwSFJXJUAAmeANkD1eF9slAhJgdyyEvD341covGuWr2en3nF71Gmgjg00ORh8L3uR");

// const CheckoutForm = ({ finalPrice, userId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//       billing_details: {
//         name,
//         email,
//       },
//     });

//     if (error) {
//       setError(error.message);
//       setLoading(false);
//     } else {
//       setSuccess(`Payment successful! Payment ID: ${paymentMethod.id}`);
//       setError("");
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <h2>Payment Details</h2>

//       <label>Name:</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter your name"
//         required
//       />

//       <label>Email:</label>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter your email"
//         required
//       />

//       <label>Card Information:</label>
//       <CardElement className="card-element" />

//       <div className="price-section">
//         <p><strong>Final Price:</strong> ₹{finalPrice}</p>
//       </div>

//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? "Processing..." : "Pay Now"}
//       </button>

//       {error && <div className="error">{error}</div>}
//       {success && <div className="success">{success}</div>}
//     </form>
//   );
// };

// const Payment = () => {
//   const location = useLocation();
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const user_id = queryParams.get("user_id");
//     const price = queryParams.get("price");

//     if (user_id && price) {
//       setUserId(user_id);
//       setFinalPrice(price);
//     }
//   }, [location.search]);

//   return (
//     <div className="payment-container">
//       <h1>Secure Payment</h1>
//       <Elements stripe={stripePromise}>
//         <CheckoutForm finalPrice={finalPrice} userId={userId} />
//       </Elements>
//     </div>
//   );
// };

// export default Payment;






import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";  // ✅ Added useNavigate
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Payment.css";  // Styling

const stripePromise = loadStripe("pk_test_51R6yLoQv1IMBu83xiZ4SB4CnYYJEXX9OhZwSFJXJUAAmeANkD1eF9slAhJgdyyEvD341covGuWr2en3nF71Gmgjg00ORh8L3uR");

const CheckoutForm = ({ finalPrice, userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();  // ✅ For redirection
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name,
        email,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(`🎉 Payment successful! Payment ID: ${paymentMethod.id}`);
      setError("");
      setLoading(false);

      // ✅ Redirect to home page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Payment Details</h2>

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />

      <label>Card Information:</label>
      <CardElement className="card-element" />

      <div className="price-section">
        <p><strong>Final Price:</strong> ₹{finalPrice}</p>
      </div>

      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {error && <div className="error">{error}</div>}
      {success && (
        <div className="success">
          {success}
          <p>✅ Redirecting to home page...</p>
        </div>
      )}
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();  // ✅ Added useNavigate for redirection
  const [finalPrice, setFinalPrice] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const user_id = queryParams.get("user_id");
    const price = queryParams.get("price");

    if (user_id && price) {
      setUserId(user_id);
      setFinalPrice(price);
    }
  }, [location.search]);

  return (
    <div className="payment-container">
      <h1>Secure Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm finalPrice={finalPrice} userId={userId} />
      </Elements>
    </div>
  );
};

export default Payment;
