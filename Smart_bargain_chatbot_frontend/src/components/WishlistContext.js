import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : {};
  });

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Function to toggle wishlist items
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = { ...prevWishlist };

      if (updatedWishlist[productId]) {
        delete updatedWishlist[productId]; // Remove from wishlist
      } else {
        updatedWishlist[productId] = true; // Add to wishlist
      }

      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);