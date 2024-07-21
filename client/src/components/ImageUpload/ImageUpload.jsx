/* eslint-disable react/prop-types */

import { useState } from "react"
import "./index.css"
function ImageUpload({setImageUrl}) {
  //upon click 
  // - preview image and start uploading to cloudinary
  // - if error occurs retry
  const [image,setImage] = useState("")
  //const img_url = ""
  const [uploading,setUploading] = useState(false)
  
  const [preview,setPreview]=useState("")
  // - upon successful upload, set img_url to the secure_url from cloudinary response
  const handleUpload = async (e) => {
    e.preventDefault()


      const file = e.target.files[0]

    if (!file) return
    setImage(file)

    setUploading(true)


  
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "blog-image")

    console.log("uploading to cloudinary ...")

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dxwlzto9h/image/upload", {
        method: "POST",
        body: formData,
      })
      
      console.log("response from cloudinary",res)
      const data = await res.json()

      setUploading(false)

      console.log("refined data..",data)
      if (!data.secure_url) throw new Error("Failed to upload image")
        setPreview(data.secure_url)
    setImageUrl(data.secure_url)
    //   setImg_url(data.secure_url)

    } catch (err) {
        setUploading(false)
        setImageUrl("")
      console.error("Error uploading image", err)
    //   setImg_url("")
    }
  }

  return (
    <div >
    {/* image preview component */}
    {image ?(
        <div className="previewContainer">
            { uploading ? (
                <p>Uploading...</p>
            )
            : (
              <img src={preview} alt="preview" className="previewImage" />  
            )
            }
        </div>
        
    ) : (
        <input type="file" id="image" accept="image/*" required onChange={handleUpload}/>
    )}
    
    </div>
  )
}

export default ImageUpload