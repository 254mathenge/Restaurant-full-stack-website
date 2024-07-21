/* eslint-disable no-unused-vars */

import "./AdminCreate.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import ImageUpload from "../ImageUpload/ImageUpload";
toastConfig({ theme: "dark" });

function Create() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
  const handleSubmit = async (values) => {
    console.log("submitting");
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (response.status === 201) {
        alert("meal created sucessful");
        navigate("/Menu");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to create meal.");
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Title is required"),
    description: Yup.string().required("Content is required"),
    price: Yup.number().required("Price is required"),
    category: Yup.string().required("Category is required"),
    
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
    },

    onSubmit: (values) => {
      alert("Form issubmitting");
      console.log("creating", values);
      values.imageUrl = imageUrl;
      values.price= parseFloat(values.price)
      handleSubmit(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="create-meal-section">
      <form className="meal-form" onSubmit={formik.handleSubmit}>
        <h2>Welcomee</h2>
        

        <ImageUpload setImageUrl={setImageUrl} />

        <div className="meal-name">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="error">{formik.errors.name}</p>
          )}
        </div>
        <div className="meal-dscription">
          <label htmlFor="description">Description:</label>
            <textarea id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}></textarea>
          
          {formik.touched.description && formik.errors.description && (
            <p className="error">{formik.errors.description}</p>
          )}
        </div>
        <div className="meal-price">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="error">{formik.errors.price}</p>
          )}
        </div>
        <div className="meal-category">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.category && formik.errors.category && (
            <p className="error">{formik.errors.category}</p>
          )}
        </div>
        <div className="meal-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
