import { Route, Routes } from "react-router-dom";
import './App.css';
import AddNewTask from "./Pages/AddNewTask";
import Completed from "./Pages/Completed";
import EditingTask from "./Pages/EditingTask";
import Home from './Pages/Home';
import Navbar from './Pages/Shard/Navbar';
import RequireAuth from "./Pages/Shard/RequireAuth";
import ToDo from "./Pages/ToDo";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Footer from "./Pages/Shard/Footer";

function App() {
  return (
    <div>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/todo"
          element={
            <RequireAuth>
              <ToDo></ToDo>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/completed"
          element={
            <RequireAuth>
              <Completed></Completed>
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/addNewTask"
          element={
            <RequireAuth>
              <AddNewTask></AddNewTask>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <RequireAuth>
              <EditingTask></EditingTask>
            </RequireAuth>
          }
        ></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="/signIn" element={<SignIn></SignIn>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
