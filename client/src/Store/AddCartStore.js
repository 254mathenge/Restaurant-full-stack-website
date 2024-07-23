/* eslint-disable no-unused-vars */

import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"
const CartStore=(set)=>({
    cartItems:[],
//state and update functions

addItemToCart:(cartItem)=>{
    set((previousState)=>{
        return{cartItems:[cartItem, ...previousState.cartItems]}
    })
},
deleteItemCart:(itemId)=>{
    set((state)=>{
        const updateItems=state.cartItems.filter((item)=>{
            item.mealId !== itemId
        })
        return{cartItems:updateItems}
    })
}
})
const useCartStore=create(devtools(persist(CartStore,{
    name:"Item"
})))

export default useCartStore