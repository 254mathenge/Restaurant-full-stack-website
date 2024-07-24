/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../Store/AddCartStore";
import "./UsersCart.css";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
toastConfig({ theme: "dark" });
function Users() {
  const cartItems= useCartStore((state) => state.cartItems);
  const deleteItemCart = useCartStore((state) => state.deleteItemCart);
  const [loading, setLoading] = useState();
  const [error ,setError]=useState("")
  const [orders,setOrders]=useState([])
  const handleSubmit = async (orders) => {
    console.log("ordering");
    setLoading(true);
    console.log(orders);

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(orders),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (response.status === 201) {
        toast("meal ordered sucessful");
        navigate("/Menu");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to order meal.");
      setLoading(false);
    }
  };
  

  const handleDeleteMeal= (meal) => {
    console.log(meal);
    setLoading(true);
    deleteItemCart(meal)
  };
  return (
    <div className="meals-meals">
      <h2 className="meals-title-meals">Welcome ,,here are your meals-orders!!</h2>
      <div className="meals-container">
        {cartItems.length === 0 ? (
          <p>No meals available.</p>
        ) : (
          cartItems.map((meal,i) => (
            <div className="meals-the-card" key={i}>
              <div className="meal-the-image">
                <img src={meal.imageUrl} alt={meal.name} className="meal-the-image" />
              </div>
              <div className="meal-the-texts">
                <div>
                  <p className="meal-the-name">{meal.name}</p>
                </div>
                <div>
                  <p className="meal-the-des">{meal.description}</p>
                </div>
                <div>
                  <p className="meal-the-price">${meal.price}</p>
                </div>
                <div>
                  <p className="meal-the-category">{meal.Category}</p>
                </div>
              </div>
              <div className="delete-btn">
                   
                   <button
                     className="delete-btn"
                     onClick={() => handleDeleteMeal(meal)}
                   >
                     {loading ? "deleting..." : "delete"}{" "}
                   </button>
                 </div>
                 <div className="order-btn">
                   
                   <button type="submit"
                     className="order-btn" onClick={handleSubmit}
                    
                   >order
                   </button>
                   </div>
             
            </div>
          ))
        )}
      </div>
     

    </div>
  );
}

export default Users;
