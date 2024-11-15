"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRecipes } from "@/providers/recipeContext";
import Image from "next/image";

const CartContent = () => {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("recipeId");
  const router = useRouter();
  const { cart, addToCart, removeFromCart, fetchRecipeDetails } = useRecipes();
  const { data: recipeDetails } = fetchRecipeDetails(recipeId) || {};

  useEffect(() => {
    if (recipeId && recipeDetails) {
      const recipeExists = cart.some((item) => item.idMeal === recipeDetails.idMeal);
      if (!recipeExists) {
        addToCart(recipeDetails);
      }
    }
  }, [recipeId, recipeDetails, cart, addToCart]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto lg:mt-8">
        <h1 className="text-2xl mb-8 text-center font-semibold text-yellow-900">
          My <span className="text-yellow-700">Cart</span>
        </h1>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-yellow-900">Item No.</th>
                <th className="py-3 px-6 text-yellow-900">Recipe Image</th>
                <th className="py-3 px-6 text-yellow-900">Recipe Name</th>
                <th className="py-3 px-6 text-yellow-900">Recipe Category</th>
                <th className="py-3 px-6 text-yellow-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <tr key={item.idMeal} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">
                      <Image
                        src={item.strMealThumb}
                        alt={item.strMeal}
                        width={64}
                        height={64}
                        className="object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-3 px-6">{item.strMeal}</td>
                    <td className="py-3 px-6">{item.strCategory}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => removeFromCart(item.idMeal)}
                        className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center">Cart is Empty.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/")}
            className="mt-4 py-2 px-6 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
