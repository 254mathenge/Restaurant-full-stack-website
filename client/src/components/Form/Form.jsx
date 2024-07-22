/* eslint-disable no-unused-vars */
import "./Form.css"
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useState} from "react"
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css'; 
import {Link, useNavigate } from "react-router-dom";
toastConfig({ theme: 'dark' });

function Form(){
    const [error,setError]=useState()
    const [loading ,setLoading]=useState("")
    const navigate = useNavigate();
    const handleSubmit= async(values)=>{
        console.log("values")
        console.log(values)
        setLoading(true)
        try{
            const response=await fetch("http://localhost:3000/users",{
                method :"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values)
            })
            const data=await response.json()
            console.log(data)
            toast("SignUp Successful")
            if (response.status === 201) {
                navigate("/SignIn")
              } else {
                setError(data.message)
              }
      
        }
        catch(error){
            console.log(error)
        }
        finally{
          setLoading(false)
        }
    }
    const ValidationSchema = Yup.object({
        firstName: Yup.string("name must be string").required("field is required"),
        lastName: Yup.string("LasName must be string").required(
          "field is required"
        ),
        emailAddress: Yup.string("must be string")
          .email("invalid Email")
          .required("this field is required"),
        password: Yup.string("password must be string"),
        confirmPassword:Yup.string("password must be string").required("field isrequired"),
        contact: Yup.string("must be string").required("field is required"),
      });
    const formik=useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword:"",
            contact:"",
            Role:""
          },
          onSubmit: (formState) => {
            console.log("Here is the user");
            console.log(formState);
            handleSubmit(formState);
          },
          validationSchema:ValidationSchema
    })

    return(
        <div className="signup-section">
           
        <div className="signup-form-section">
            <form className="form-section" onSubmit={formik.handleSubmit}>
            <h2 className="signup-title">SignUp</h2>
                <div>
                <label htmlFor="firstName">FirstName:</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter firstname" value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>{formik.touched.firstName && formik.errors.firstName && <p>{formik.errors.firstName }</p>}
                </div>
                <div>
                <label htmlFor="lastName">LastName:</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter lastname" value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>{formik.touched.lastName&& formik.errors.lastName&& <p>{formik.errors.lastName}</p>}
                </div>
                <div>
                <label htmlFor="emailAddress">Email Address:</label>
                <input type="email" id="emailAddress" name="emailAddress" placeholder="Enter email" value={formik.values.emailAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>{formik.touched.emailAddress && formik.errors.emailAddress&& <p>{formik.errors.emailAddress}</p>}
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter password" value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>{formik.touched.password&& formik.errors.password && <p>{formik.errors.password}</p>}
                </div>
                <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>{formik.touched.confirmPassword && formik.errors.confirmPassword&& <p>{formik.errors.confirmPassword }</p>}
                </div>
                <div>
                <label htmlFor="contact">Contact:</label>
                <input type="text" id="contact" name="contact" placeholder="Enter contact" value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>{formik.touched.contact && formik.errors.contact && <p>{formik.errors.contact}</p>}
                </div>
                <div>
                <button className="signup-btn">{loading ? "please wait..." : "submit"}</button>
                </div>
                <p>Already have an account??<Link to="/SignIn">SignIn</Link> </p>
            </form>
        </div>
        </div>
    )
}

export default Form;
