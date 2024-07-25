/* eslint-disable no-unused-vars */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const CartStore = (set) => ({
  cartItems: [],
  // cartItem:[],
  //state and update functions

  addItemToCart: (cartItem) => {
    set((previousState) => {
      return { cartItems: [cartItem, ...previousState.cartItems] };
    });
  },
  deleteItemCart: (itemId) => {
    set((state) => {
      console.log("Before delete:", state.cartItems);
      const updateItems = state.cartItems.filter((meal) => {
        meal.mealId !== itemId
        console.log("after delete:",state.updateItems);
      });
      return { cartItems: updateItems };
      
    });
  },
});
const useCartStore = create(
  devtools(
    persist(CartStore, {
      name: "Item",
    })
  )
);

export default useCartStore;
