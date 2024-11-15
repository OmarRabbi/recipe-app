import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  const router = useRouter();
  // Add recipe to cart function
  const addToCart = (recipeId) => {
    router.push(`/cart?recipeId=${recipeId}`);
  };
  return (
    <div
      onClick={() => handleDetailsOpen(recipe?.idMeal)}
      className="group w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[500px] flex flex-col justify-between border border-gray-100 rounded-3xl bg-white px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10"
    >
      <div className="flex justify-center h-[250px] w-full overflow-hidden mb-4">
        <Image
          className="object-cover rounded-2xl"
          src={recipe?.strMealThumb}
          alt="Recipe Image"
          loading="lazy"
          width={300}
          height={250}
        />
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
        {recipe?.strMeal}
      </h3>
      <p className="text-sm text-gray-500 my-4 flex-grow">
        {`${"Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum, consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea animi officiis".substring(
          0,
          60
        )}...`}
      </p>
      <div className="flex justify-center space-x-4 mt-auto">
        {/* Add to Cart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(recipe?.idMeal);
          }}
          className="py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400"
        >
          <span className="hidden text-yellow-900 font-semibold md:block">
            Add to Cart
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 mx-auto text-yellow-900 md:hidden"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 0a1 1 0 0 1 1 1v1h7V1a1 1 0 1 1 2 0v1h1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h1V1a1 1 0 1 1 2 0v1h7V1a1 1 0 0 1 1-1zm0 3v11h10V3H5.5z" />
          </svg>
        </button>
        {/* Details button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDetailsOpen(recipe?.idMeal);
          }}
          className="py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400"
        >
          <span className="hidden text-yellow-900 font-semibold md:block">
            Details
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 mx-auto text-yellow-900 md:hidden"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7zm0 13A6 6 0 1 1 14 8a6 6 0 0 1-6 6zM8 4a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zm1 5a1 1 0 0 1-1 1H7a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
