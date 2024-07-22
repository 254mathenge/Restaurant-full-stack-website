

import "./About.css"
import aboutimage from "../../assets/hero1.jpg"
import welcome from "../../assets/welcome.jpg"
function About(){
return(
    <>
     <div>
            <h2 className="about-title">About Us</h2>
        </div>
    <div className="about-section">
       
        <div className="about-section-text">
            <img src={welcome} alt="welcome-image"className="welcome-image" />
            <p className="about-text">Et sed voluptua duo rebum no justo. Rebum erat dolore dolore dolor lorem aliquyam dolore. Diam kasd ipsum kasd sit, ipsum amet aliquyam clita et duo duo voluptua no sit.</p>
        </div>
        <div className="about-section-image">
            <img src={aboutimage} alt="about-image" className="about-image"/>
        </div>
    </div>
    </>
)
}
export default About;


