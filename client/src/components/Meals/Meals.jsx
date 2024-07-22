/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react";
import "./Meals.css";

function Meals() {
  const [myMeals, setMyMeals] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:3000/meals", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (response.status === 200) {
          console.log("meals fetched");
        }
        const data = await response.json();
        console.log(data.meals);
        setMyMeals(data.meals);

        if (Array.isArray(data)) {
          setMyMeals(data);
          console.log("meals fetched");
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="meals-section">
      <h2 className="meals-title">Menu</h2>
      {Array.isArray(myMeals) ? (
        myMeals.map((meal, index) => (
          <div className="meals-card" key={index}>
            <div className="meal-image">
              <img src={meal.imageUrl} alt={meal.name} className="meal-image"/>
            </div>
            <div className="meal-texts">
            <div>
              <p className="meal-name">{meal.name}</p>
            </div>
            <div>
              <p className="meal-des">{meal.description}</p>
            </div>
            <div>
              <p className="meal-price">${meal.price}</p>
            </div>
            <div>
              <p className="meal-category">{meal.Category}</p>
            </div>
            <div>
           <button className="meal-btn">Add to Cart</button>
         </div>
            </div>
          </div>
         
        ))
      ) : (
        <p>No meals available</p>
      )}
        
    </div>
  );
}

export default Meals;
