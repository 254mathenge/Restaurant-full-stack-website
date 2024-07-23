/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../Store/AddCartStore";
import "./UsersCart.css";

function Users() {
  const cartItems = useCartStore((state) => state.cartItems);
  const deleteItemCart = useCartStore((state) =>state.deleteItemCart)

  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();

  const handleDelete = async (meal) => {
    // console.log("deleting");
    // console.log(meals);
    console.log(meal);
    setLoading(true);
    deleteItemCart(meal)
  }
  return (
    <>
      <h2 className="meal1-title">Welcome ,,here are your selected meals!!</h2>
      <div className="meal-card-sections">
        {cartItems.length === 0 ? (
          <p>No meals available.</p>
        ) : (
          cartItems.map((meal, i) => (
            <div className="user-meals-card" key={i}>
              <div className="meal-image">
                <img src={meal.imageUrl} alt={meal.name} />
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
              <div className="user-buttons">
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(meal);
                  }}
                >
                  {loading ? "deleting..." : "delete"}{" "}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Users;
