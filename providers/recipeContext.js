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

  useEffect(() => {
    const loadCartData = () => {
      if (isAuthenticated && userId) {
        const cartKey = `${userId}_${uuidv4()}_cart`;
        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) {
          setCart(JSON.parse(savedCart)); 
        } else {
          setCart([]); 
        }
      } else {
        const guestKey = localStorage.getItem("guest_session_id");
        const cartKey = guestKey ? `${guestKey}_cart` : `guest_${uuidv4()}_cart`;
        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) {
          setCart(JSON.parse(savedCart)); 
        } else {
          setCart([]);
        }

        if (!guestKey) {
          const newGuestKey = uuidv4(); 
          localStorage.setItem("guest_session_id", newGuestKey);
        }
      }
    };
    loadCartData();
  }, [isAuthenticated, userId]);

  // Add item to cart
  const addToCart = (recipe) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, recipe];
      if (isAuthenticated && userId) {
        const cartKey = `${userId}_${uuidv4()}_cart`;
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      } else {
        const guestKey = localStorage.getItem("guest_session_id");
        const cartKey = guestKey ? `${guestKey}_cart` : `guest_${uuidv4()}_cart`; // Ensure unique cart for each guest
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      }

      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (idMeal) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.idMeal !== idMeal);
      
      if (isAuthenticated && userId) {
        const cartKey = `${userId}_${uuidv4()}_cart`;
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      } else {
        const guestKey = localStorage.getItem("guest_session_id");
        const cartKey = guestKey ? `${guestKey}_cart` : `guest_${uuidv4()}_cart`;
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);

    if (isAuthenticated && userId) {
      const cartKey = `${userId}_${uuidv4()}_cart`;
      localStorage.removeItem(cartKey);
    } else {
      const guestKey = localStorage.getItem("guest_session_id");
      const cartKey = guestKey ? `${guestKey}_cart` : `guest_${uuidv4()}_cart`;
      localStorage.removeItem(cartKey);
    }
  };

  // Reset the cart state on logout
  useEffect(() => {
    if (!isAuthenticated) {
      setCart([]);
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
