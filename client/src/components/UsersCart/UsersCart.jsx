

/* eslint-disable no-unused-vars */
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./UsersCart.css"


function Users() {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(null);
    const[loading,setLoading]=useState()
    
    useEffect(() => {
       
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No token found');
            return;
        }
        const fetchUserBlogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/meals/mealId', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                    credentials:"include"
                   

                });

                console.log(response)
               
                
                 
                const data = await response.json();
                if (Array.isArray(data)) {
                    setMeals(data);
                    console.log(data)
                } 
                if (response.status === 200) {
                    console.log("meals fetched")
                   
                 } 
            } catch (error) {
                setError(error.message);
                console.error(error);
            }
        };

        fetchUserBlogs();
    }, []);
    const handleDelete = async ( mealId) => {
        console.log("deleting")
        console.log([meals[0]])
        console.log(mealId)
        setLoading(true)
    const token = localStorage.getItem('token');

    if (!token) {
        setError('No token found');
        return;
        }
        
        try {
            const response = await fetch(`http://localhost:3000/blogs/${mealId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                credentials:"include"
            });
            console.log(response)
            const data = await response.json();
            if (Array.isArray(data)) {
                setMeals(data);
                console.log(data)
                
            }
            if (response.status === 200) {
                setMeals(meals.filter((meal) => meal.mealId !== mealId));
                console.log("meals fetched")
        
            }
        
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false)
        }
    
    };

    return (
        <>
            <h2 className="meal1-title">Welcome ,,here are your selected meals!!</h2>
        <div className="meal-card-sections">
           
            {error && <p className="error">{error}</p>}
            {meals.length === 0 ? (
                <p>No meals available.</p>
            ) : (
                meals.map((meal, i) => (
                    <div className="user-meals-card" key={i} >
                       <div className="meal-image">
              <img src={meal.imageUrl} alt={meal.name} />
            </div>
                        <div className="user-details">
                        <div className="meal-title">
                            <p className="user-blog-title">{meal.title}</p>
                        </div>
                        <div className="blogs-content">
                            <p className="blogs-content">{meal.content}</p>
                        </div>
                            </div>
                        <div className="user-buttons">
                            <button className="edit-btn" >Edit</button>
                            <button className="delete-btn" disabled={loading} onClick={(e) => {
                                e.preventDefault();
                                handleDelete(meal.mealId )
                            }}>
                            {loading ? "deleting..." : "delete"} </button>
                        </div>
                    </div>
                ))
            )}
            
            </div>
            </>
    );
}

export default Users;