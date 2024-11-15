"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRecipes } from "@/providers/recipeContext";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the Cart component to ensure it only runs on the client-side
const CartContent = dynamic(() => import("./CartContent"), {
  ssr: false, // Disable server-side rendering for this component
});

const Cart = () => {
  return <CartContent />;
};

export default Cart;
