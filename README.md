# Recipe App

# Description:

- Tailus Feedus is a modern, user-friendly recipe app designed to provide a seamless experience for browsing, saving, and managing recipes. It offers an intuitive interface for users to explore a wide range of recipes, add them to their cart, and manage their personal collections. Users can register and log in to save their cart and recipes across sessions. The app also allows guest users to browse and manage their cart locally.

## Features Implemented

### 1. **Authentication and User Management (Login/Logout)**
   - **Technical**: Implemented authentication using `AuthContext` to manage user login state, storing session data in `localStorage`. Users can log in, log out, and their authentication state persists across page reloads.
   - **Non-Technical**: Users can sign up, log in, and log out. The app remembers their login status even after a page refresh.

### 2. **Cart Management (Add/Remove Items, Persistence)**
   - **Technical**: Integrated a cart system using `RecipeContext`. Cart items are stored in `localStorage` for both authenticated and guest users. Cart data persists across sessions, even after page reloads.
   - **Non-Technical**: Users can add and remove recipes from their cart. The cart is saved and remembered even if users refresh the page or return to the site later.

### 3. **Recipe Listing
   - **Technical**: Recipes are fetched using react-query from an API and displayed in a list format.
   - **Non-Technical**: Users can browse a list of recipes and add their favorites to the cart.

### 4. **User Cart for Authenticated and Guest Users**
   - **Technical**: Used `localStorage` to store cart data for both authenticated and guest users. Cart items are merged if a guest user logs in, ensuring no data loss between sessions.
   - **Non-Technical**: Both logged-in users and guests can keep their cart items even if they leave and come back later, and logged-in users won't lose cart items when signing in.

### 5. **Dynamic Cart Item Count in Navbar**
   - **Technical**: The cart item count in the navigation bar dynamically updates based on the current cart state.
   - **Non-Technical**: The cart count in the navigation bar reflects the number of items in the cart, and it updates in real-time as items are added or removed.

---

## Bug Fixes

### 1. **Fixed Authentication**
   - Authentication state wasn't properly preserved across page reloads.

### 2. **Fixed Missing Data After Login**
   - Ensured that when a user logs in, their previously added cart items (as a guest) are not lost, and the cart is properly merged with the logged-in user's data.

### 3. **Corrected Cart Persistence on Page Reload**
   - Fixed issues with cart data not persisting after a page reload, ensuring that cart items remain intact for both guest and authenticated users.

---

## Time Estimate
- **Total Time Spent**: 18-20 hours
