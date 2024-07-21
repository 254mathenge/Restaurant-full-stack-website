import "./Header.css"
import {Link} from "react-router-dom"
function Header(){
    return(
        <>
        <div className="header">
            <h1 className="header-title">Peaches Restaurant</h1>
            <div className="header-nav-list">
                <ul className="header-nav-list-link">
                    <li className="nav-list-link"><Link to="/" >Home</Link></li>
                    <li className="nav-list-link"><Link to="/menu" >OurMenu</Link></li>
                    <li className="nav-list-link"><Link to="/SignUp" >SignUp</Link></li>
                    <li className="nav-list-link"><Link to="/CreateMeals" >CreateMeals</Link></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Header;