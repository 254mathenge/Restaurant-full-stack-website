/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import "./Orders.css"
import {useEffect,useState} from "react"
function Order(){
    const [myOrders,setMyOrders]=useState()
    useEffect(() => {
        const fetchOrders = async () => {
        
          const token = localStorage.getItem('token');

          if (!token) {
              setError('No token found');
              return;
          }
          console.log(token);
          try {
            const response = await fetch("http://localhost:3000/orders", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response);
            if (response.status === 200) {
              console.log("orders fetched");
            }
            const data = await response.json();
            console.log(data.orders);
            setMyOrders(data.orders);
    
            if (Array.isArray(data)) {
              setMyOrders(data);
              console.log("meals fetched");
            }
          } catch (error) {
            console.log("Error fetching meals");
          }
        };
    
        fetchOrders();
      }, []);
    return(
        <>
        <div className="meal-order">
        <div className="meal-name">
        {Array.isArray(myOrders) ? (
        myOrders.map((order, index) => (
            <div className="order-card" key={index}>
                <div>
                <p className="order-meal">{order.title}</p>   
                </div>
                {order.author && (
                  <>
                <div>
                    <p className="order-user">{order.customer.firstName}</p>
                </div>
                <div>
                    <p className="order-time">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    </>
                )}
            </div>
        ))
    ) : (
        <p>No orders available</p>
        )}
        </div>
        </div>
        </>
    )
}
export default Order