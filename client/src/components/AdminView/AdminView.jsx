/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react"

import "./AdminView.css"
function View() {
  const [myMeals, setMyMeals] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error ,setError] =useState("")
  const [editingMeal, setEditingMeal] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
  })
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:3000/meals", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response);
        if (response.status === 200) {
          // console.log("meals fetched");
        }
        const data = await response.json();
        // console.log(data.meals);
        setMyMeals(data.meals);

        if (Array.isArray(data)) {
          setMyMeals(data);
          // console.log("meals fetched");
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [myMeals]);
  const handleDelete = async (mealId) => {
    console.log("deleting")
     console.log(myMeals[0])
    console.log(mealId)
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:3000/meals/${mealId}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
          }
      });
      console.log(response)
      const data = await response.json();
  
      console.log("response data",data)
      if (Array.isArray(data)) {
          setMyMeals(data);
          
          
      }
      if (response.status === 200) {
          setMyMeals(myMeals.filter((myMeal) => myMeal.mealId !== mealId));
          console.log("meal deleted")
          
      }
  
  } catch (error) {
      setError(error.message);
      console.log(error);
  } finally {
      setLoading(false)
  }

  }
  const handleUpdate = async (e,mealId) => {
    e.preventDefault();
    setLoading(true);
    console.log(mealId);
    console.log("updating");
    

    try {
      const response = await fetch(`http://localhost:3000/meals/${mealId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      const updatedMeal = await response.json();

      if (response.status === 200) {
        console.log(updatedMeal);
        setMyMeals((prevMeals) =>
          prevMeals.map((meal) =>
            meal.mealId === editingMeal.mealId ? updatedMeal : meal
          )
        );
        setEditingMeal(null);
        console.log("meal updated");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="meals-meals">
     <h2 className="meals-title-meals">Admin Dashboard</h2>
    <div className="meals-container">
     
      {Array.isArray(myMeals) ? (
        myMeals.map((meal, index) => (
          <div className="meals-the-card" key={index}>
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
            <div className="delete-edit-btn">
            <div>
            <button  className="delete-btn" disabled={loading} onClick={(e) => {
                                e.preventDefault();
                                handleDelete(meal.mealId)
                            }}>
                            {loading ? "deleting..." : "delete"} </button>
                            </div>
                            <div>
                            <button disabled={loading} onClick={handleUpdate}>
            {loading ? "Updating..." : "Update"}
          </button>
                            </div>
                          
            </div>
          </div>
        ))
      ) : (
        <p>No meals available</p>
      )}
      
    </div>
    </div>
  );
}

export default View;
