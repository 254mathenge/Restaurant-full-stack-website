
import Order from "../components/Orders/Orders"
import Create from "../components/AdminCreate/AdminCreate"
import View from "../components/AdminView/AdminView"
// import { useNavigate } from "react-router-dom";
function CreateMeals(){
    // const navigate = useNavigate();
    // const handleLogout = () => {
    //     // setUserRole(false);
    //     navigate("/");
    //     // console.log(Role);
    //   };
return(
    <>
{/* <div >
                <button onClick={handleLogout} className="go-back">Logout</button>
                </div> */}
    <View/>
    <Create/>
    <Order/>
    </>
)
}
export default CreateMeals