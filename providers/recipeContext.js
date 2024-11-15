"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HttpKit from "../common/helpers/HttpKit";
import { useAuth } from "@/providers/authContext"; 
import { v4 as uuidv4 } from 'uuid';


const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [cart, setCart] = useState([]); 
  const { isAuthenticated, userId } = useAuth();

  // Function to get the correct cart key based on user authentication
  const getCartKey = () => {
    if (isAuthenticated && userId) {
      return `${userId}_cart`;  // Consistent cart key for authenticated users
    } else {
      const guestKey = localStorage.getItem("guest_session_id");
      return guestKey ? `${guestKey}_cart` : `guest_${uuidv4()}_cart`;  // Consistent key for guest users
    }
  };

  // Fetch all recipes
  const { data: recipes, error, isLoading } = useQuery({
    queryKey: ["allRecipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  // Fetch recipe details
  const fetchRecipeDetails = (id) => {
    return useQuery({
      queryKey: ["recipeDetails", id],
      queryFn: () => HttpKit.getRecipeDetails(id),
    });
  };

  // Load cart data from localStorage
  useEffect(() => {
    const loadCartData = () => {
      const cartKey = getCartKey();
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    };

    loadCartData();
  }, [isAuthenticated, userId]);

  // Add item to cart
  const addToCart = (recipe) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, recipe];
      const cartKey = getCartKey();
      localStorage.setItem(cartKey, JSON.stringify(updatedCart)); // Store updated cart
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (idMeal) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.idMeal !== idMeal);

      if (updatedCart.length === 0) {
        console.log("Cart is now empty, updating localStorage...");
      }

      const cartKey = getCartKey();
      localStorage.setItem(cartKey, JSON.stringify(updatedCart)); // Store updated cart

      return updatedCart;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    const cartKey = getCartKey();
    localStorage.removeItem(cartKey); // Remove cart from localStorage
  };

  // Reset the cart state on logout
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User logged out, clearing cart...");
      setCart([]);
      const cartKey = getCartKey();
      localStorage.removeItem(cartKey); // Clear cart from localStorage
    }
  }, [isAuthenticated]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        error,
        isLoading,
        cart,
        addToCart,
        removeFromCart,
        fetchRecipeDetails,
        clearCart,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook to use the RecipeContext
export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used in RecipeProvider");
  }
  return context;
};
