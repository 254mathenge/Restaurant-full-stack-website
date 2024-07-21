import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Menu from "./pages/Menu";
import CreateMeals from "./pages/CreateMeals";
import MyMeals from "./pages/MyMeals";
function App() {
  return <>
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Menu" element={<Menu/>}/>
    <Route path="/SignUp" element={<SignUp/>}/>
    <Route path="/SignIn" element={<SignIn/>}/>
    <Route path="/CreateMeals" element={<CreateMeals/>}/>
    <Route path="/MyMeals" element={<MyMeals/>}/>
  </Routes>
  </BrowserRouter>
  </>;
}

export default App;
