/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../Store/RoleStore";

const Header = () => {
  const navigate = useNavigate();
  const Role = useStore((state) => state.Role);
  const setUserRole = useStore((state) => state.setUserRole);
  //   const updateUserRole = (newRole) => {
  //     const setUserRole = useStore((state) => state.setUserRole);
  //     setUserRole(newRole);
  //   };

  const handleLogout = () => {
    setUserRole(false);
    navigate("/");
    console.log(Role);
  };
  return (
    <>
      <div className="header">
        <h1 className="header-title">Peaches Restaurant</h1>
        <div className="header-nav-list">
          <ul className="header-nav-list-link">
            {Role ? (
              <div className="login-nav">
                <li className="nav-list-link">
                  <Link to="/menu">OurMenu</Link>
                </li>
                <li className="nav-list-link">
                  <Link to="/myMeals">myMeals</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </div>
            ) : (
              <div className="login-nav">
                <li className="nav-list-link">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-list-link">
                  <Link to="/SignUp">SignUp</Link>
                </li>
              </div>
            )}

            {/* {Role === "Admin" && (
              <>
                
              </>
            )}
            {Role === "user" && (
             
            )} */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
