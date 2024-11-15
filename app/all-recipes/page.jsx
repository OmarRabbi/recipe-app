"use client";
import RecipeCard from "@/components/Recipes/RecipeCard";
import { useRecipes } from "@/providers/recipeContext";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal"; 
import SingleRecipe from "@/components/Recipes/SingleRecipe"; 

const AllRecipes = () => {
  const { recipes, error, isLoading } = useRecipes();
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [searchInput, setSearchInput] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredRecipes, setFilteredRecipes] = useState([]); 
  const [openDetails, setOpenDetails] = useState(false);
  // Handle details view
  const handleDetailsOpen = (id) => {
    setSelectedRecipeId(id);
    setOpenDetails(true); 
  };
  // Handle search input change
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    setSearchQuery(query); 
  };
  // Handle search when form is submitted
  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchQuery) {
      const filtered = recipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered); 
    } else {
      setFilteredRecipes(recipes); 
    }
  };
  // Update filtered recipes 
  useEffect(() => {
    if (recipes) {
      setFilteredRecipes(recipes); 
    }
  }, [recipes]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto mt-20">
        <h1 className="text-2xl font-bold text-center lg:text-start text-yellow-900 lg:ml-6">
          All <span className="text-yellow-700">Recipes</span>
        </h1>
        {/* Search form */}
        <div>
          <form onSubmit={handleSearch} className="w-full mt-12">
            <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
              <input
                type="text"
                placeholder="Search for recipes"
                className="w-full p-4 rounded-full outline-none bg-transparent"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <button
                type="submit"
                title="Search"
                className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
              >
                <span className="hidden text-yellow-900 font-semibold md:block">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mx-auto text-yellow-900 md:hidden"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        {/* Display filtered recipes */}
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {isLoading ? (
                <div className="py-3 px-6 text-center">Loading recipes...</div>
              ) : error ? (
                <div className="py-3 px-6 text-center">Error loading recipes: {error.message}</div>
              ) : (
                filteredRecipes.length > 0 ? (
                  filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe?.idMeal}
                      recipe={recipe}
                      handleDetailsOpen={handleDetailsOpen}
                    />
                  ))
                ) : (
                  <div className="py-3 px-6 text-center">No recipes found.</div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for recipe details */}
      <Modal
        isOpen={openDetails}
        setIsOpen={setOpenDetails}
        selectedRecipeId={selectedRecipeId} 
        onClose={() => setOpenDetails(false)} 
      >
        <SingleRecipe id={selectedRecipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </div>
  );
};

export default AllRecipes;
