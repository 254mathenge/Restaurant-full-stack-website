/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import "./Orders.css"
import {useEffect,useState} from "react"
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css'; 
toastConfig({ theme: 'dark' });
function Order(){
    const [myOrders,setMyOrders]=useState()
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState()
    useEffect(() => {
        const fetchOrders = async () => {
          // setMyOrders({
          //   title:order.title,
          //   createdAt:order.createdAt,
          //   customer:{
          //     firstName:order.firstName}
            
          // })
        
          try {
            const response = await fetch("http://localhost:3000/orders", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
              },
            });
            console.log(response);
            if (response.status === 200) {
              console.log("orders fetched");
            }
            const data = await response.json();
            console.log(data.orders);
             setMyOrders(data.orders)
             
    
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
      const handleDelete = async() => {
        console.log("deleting")
        // console.log(orderId)
        setLoading(true)
        try {
          const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
              method: "DELETE",
              headers: {
                  'Content-Type': 'application/json',
              }, 
              //  'Authorization': `Bearer ${token}`
          });
          console.log(response)
          const data = await response.json();
          console.log("response data",data)
          if (Array.isArray(data)) {
              setMyOrders(data);
              
              
          }
          if (response.status === 200) {
              setMyOrders(myOrders.filter((myOrders) => myOrders.orderId !== orderId));
              console.log("order deleted")
             toast("order deleted") 
          }
      
      } catch (error) {
         
          console.log("order not deleted");
      } finally {
          setLoading(false)
      }
    }    
    return(
        <>
        <div className="meal-order">
        <h2 className="admin-order-title">Orders Made</h2>
        <div className="meal-name">
         
        {Array.isArray(myOrders) ? (
        myOrders.map((order, index) => (
            <div className="order-card" key={index}>
                <div>
                <p className="order-meal">{order.title}</p>   
                </div>
               
                  
                <div>
                    <p className="order-user">By:{order.customer.firstName}</p>
                </div>
                <div>
                    <p className="order-time">Date:{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
            <button  className="delete-btn"  onClick={(e) => {
                                e.preventDefault();
                                handleDelete(order.orderId)
                            }}>
                            {loading ? "deleting..." : "delete"} </button>
                            </div>
                
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