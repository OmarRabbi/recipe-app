import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const SingleRecipe = ({ id, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });
  // Recipe data
  const recipe = data || {};

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div className="flex justify-center">
        <Image 
          src={recipe?.strMealThumb || '/recipe-image'}
          width={500}
          height={500}
          alt={recipe?.strMeal || "Recipe Image"}
        />
      </div>
      <h2 className="text-2xl font-semibold">{recipe?.strMeal}</h2>
      <p className="text-md text-gray-600">Category: {recipe?.strCategory}</p>
      <p className="text-md text-gray-600">Area: {recipe?.strArea}</p>
      <h3 className="text-xl font-semibold">Ingredients:</h3>
      <ul className="list-disc pl-5">
        {[...Array(20)].map((_, index) => {
          const ingredient = recipe[`strIngredient${index + 1}`];
          const measure = recipe[`strMeasure${index + 1}`];
          return ingredient ? (
            <li key={index}>
              {ingredient} - {measure || "To taste"}
            </li>
          ) : null;
        })}
      </ul>
      <h3 className="text-xl font-semibold">Instructions:</h3>
      <p>{recipe?.strInstructions}</p>
      {recipe?.strYoutube && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Watch the recipe video:</h3>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${recipe?.strYoutube?.split('=')[1]}`}
            title="Recipe Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {recipe?.strTags && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Tags:</h3>
          <p>{recipe?.strTags}</p>
        </div>
      )}
      {recipe?.strSource && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Source:</h3>
          <p>{recipe?.strSource}</p>
        </div>
      )}
      {recipe?.strSource && (
        <a href={recipe?.strSource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Visit Source
        </a>
      )}
    </div>
  );
};

export default SingleRecipe;
