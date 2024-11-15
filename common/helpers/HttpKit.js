import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const HttpKit = {
  // Method to fetch all recipes
  getAllRecipes: async () => {
    try {
      // Fetch all categories
      const categoriesResponse = await axios.get(`${BASE_URL}/categories.php`);
      const categories = categoriesResponse.data.categories || [];
      console.log("Categories:", JSON.stringify(categories, null, 2)); // Detailed log of categories
  
      // Fetch recipes for each category
      const recipePromises = categories.map(async (category) => {
        const response = await axios.get(`${BASE_URL}/filter.php?c=${category.strCategory}`);
        console.log("Each Category Response:", JSON.stringify(response.data, null, 2)); // Detailed log for each category response
        return response.data.meals || [];
      });
      // Wait for all recipe fetches
      const allRecipesArray = await Promise.all(recipePromises);
      // get the result in a single array of recipes
      const allRecipes = allRecipesArray.flat();
      console.log("All Recipes:", allRecipes);
      return allRecipes;
    } catch (error) {
      console.error("Error fetching all recipes:", error);
      return [];
    }
  },
  getTopRecipes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?a=American`);
      console.log("top response:", response.data);
      return response.data.meals ? response.data.meals.slice(0, 12) : [];
    } catch (error) {
      console.error("Error fetching top recipes:", error);
      throw error;
    }
  },
  searchRecipesByName: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php`, {
        params: { s: query },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error fetching recipes by name:", error);
      throw error;
    }
  },
  searchRecipesByIngredient: async (ingredient) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { i: ingredient },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error fetching recipes by ingredient:", error);
      throw error;
    }
  },
  getRecipeDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php`, {
        params: { i: id },
      });
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw error;
    }
  },
  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`);
      return response.data.categories || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  filterByCategory: async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { c: category },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by category:", error);
      throw error;
    }
  },
  filterByArea: async (area) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { a: area },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by area:", error);
      throw error;
    }
  },
};
export default HttpKit;
