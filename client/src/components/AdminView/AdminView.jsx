/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react"

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
  const handleDelete = async ( mealId ) => {
    console.log("deleting")
    console.log([myMeals[0]])
    console.log(mealId)
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:3000/meals/mealId`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
          }
      });
      console.log(response)
      const data = await response.json();
      if (Array.isArray(data)) {
          setMyMeals(data);
          console.log(data)
          
      }
      if (response.status === 200) {
          setMyMeals(myMeals.filter((myMeal) => myMeal.mealIdid !== mealId));
          console.log("meal deleted")
          
      }
  
  } catch (error) {
      setError(error.message);
      console.error(error);
  } finally {
      setLoading(false)
  }

  }
  const handleEditClick = (meal) => {
    setEditingMeal(meal);
    setEditFormData({
      name: meal.name,
      description: meal.description,
      price: meal.price,
      imageUrl: meal.imageUrl,
      category: meal.category,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...setEditFormData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/meals/${editingMeal.mealId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      const updatedMeal = await response.json();

      if (response.status === 200) {
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="meals-section">
      <h2 className="meals-title">Menu</h2>
      {Array.isArray(myMeals) ? (
        myMeals.map((meal, index) => (
          <div className="meals-card" key={index}>
            <div className="meal-image">
              <img src={meal.imageUrl} alt={meal.name} />
            </div>
            <div>
              <p className="meal-name">{meal.name}</p>
            </div>
            <div>
              <p className="meal-des">{meal.description}</p>
            </div>
            <div>
              <p className="meal-price">{meal.price}</p>
            </div>
            <div>
              <p className="meal-category">{meal.Category}</p>
            </div>

            <div>
            <button className="delete-btn" disabled={loading} onClick={(e) => {
                                e.preventDefault();
                                handleDelete(myMeals.mealId)
                            }}>
                            {loading ? "deleting..." : "delete"} </button>

                            <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
          {/* <button type="button" onClick={() => setEditingMeal(null)}>
            Cancel
          </button> */}
            </div>
          </div>
        ))
      ) : (
        <p>No meals available</p>
      )}
      {editingMeal && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <h3>Edit Meal</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={editFormData.price}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={editFormData.imageUrl}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={editFormData.category}
              onChange={handleEditChange}
            />
          </label>
          {/* <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
          <button type="button" onClick={() => setEditingMeal(null)}>
            Cancel
          </button> */}
        </form>
      )}
    </div>
  );
}

export default View;
