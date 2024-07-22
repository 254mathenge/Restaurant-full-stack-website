/* eslint-disable no-unused-vars */
import "./Login.css"
import React from "react"
import { useState } from "react"
import { useNavigate} from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css'; 
toastConfig({ theme: 'dark' });
function Login(){
    
    const [error, setError]=useState()
    const[loading,setLoading]=useState()
    const navigate = useNavigate();
    const handleSubmit= async(values)=>{
        console.log("login user")
        setLoading(true)
        try{ 
            const response= await fetch("http://localhost:3000/users/login",{
                method :"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values),
            })
            const data= await response.json()
            console.log("response",data)
            toast("login successful")
            if (data.data.Role==="Admin"){
                navigate("/CreateMeals")
            }else {
                localStorage.setItem("token", data.data.token)
                navigate("/MyMeals")
              } 
      
        }catch(error){
            setError(error)
            console.log(error);
        }finally{
            setError(error);
            setLoading(false);
        }
    }
    const ValidationSchema=Yup.object({
        emailAddress: Yup.string("must be string")
           .email("Invalid email")
           .required("Email is required"),
        password: Yup.string("must be string")
           .required("Password is required")
        //    .min(8, "Password must be at least 8 characters long")
        })
    const formik = useFormik({
        initialValues:{
            emailAddress:"",
            password:""
        },
        onSubmit: (formState) => {
            console.log("Here is the user");
            console.log(formState);
            handleSubmit(formState);
        },
        validationSchema:ValidationSchema
    })
    return(
        <>
        <div className="login-section">
            
            <div className="login-form-section">
           
                <form className="form-section" onSubmit={formik.handleSubmit}>
                <h2 className="login-title">Login</h2>
                    <div>
                    <label htmlFor="emailAddress">Email:</label>
                    <input type="emailAddress" id="emailAddress" name="emailAddress" placeholder="Enter emailAddress" value={formik.values.emailAddress} onBlur={formik.handleBlur} onChange={formik.handleChange} />{formik.touched.emailAddress && formik.errors.emailAddress && <p>{formik.errors.emailAddress}</p>}
                    </div>
                    <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />{formik.touched.password && formik.errors.password &&<p>{formik.errors.password}</p>}
                    </div>
                    <div>
                    <button className="login-btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default Login