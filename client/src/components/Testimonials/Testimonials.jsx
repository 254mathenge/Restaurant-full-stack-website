/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./Testimonials.css"
import person from "../../assets/person1.jpg"

const testimonials = [
    {
        
        image:person,
        name: "Frank  ",
        place: "customer",
        testimony: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, beatae?"
    },
    {
       
        image: person,
        name: "Jules",
        place: "customer",
        testimony: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, beatae?"
    },
    {
       
        image:person,
        name: "Sofia",
        place: "customer",
        testimony: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, beatae?"
    },
    {
       
        image:person,
        name: "Alice",
        place: "customer",
        testimony: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, beatae?"
    },
]

const TestimonialCard =(props)=> {
    return (
        <div className="testimonials-card-section">
      <div className="testimonial-details">
        
        <div className="testimonial-image">
          <img src={props.image} alt="customer-photo" className="testimonial-image"/>
                    
                    </div>
                <div className="testimonial-name">
        <p>{props.name} </p>
      </div>
        <div className="testimonial-place">
          <p>{props.place}</p>
                </div>
                <div className="testimonial-text">
          <p>{props.testimony}</p>
        </div>
      </div>
    </div>
  );
};
    
function Testimonials() {
    return (
        <div className="testimonials-card-section">

            <h2 className="testimonials">What People Say About Us</h2>
        <div className="testimonial-card">
                {testimonials.map((testimonial, index) => {
                    return (
                        <TestimonialCard
                            key={index}
                            image={testimonial.image}
                            name={testimonial.name}
                            place={testimonial.place}
                            testimony={testimonial.testimony}
                        />
                    );
             
                })}
                </div>
        </div>
            );
        }
        export default Testimonials;