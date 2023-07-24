import NotificationsContainer from "../components/UI/NotificationsContainer/NotificationsContainer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import { Paths } from "../enums/Paths";

function Pages() {
  return (
    <>
      <Routes>
        <Route path={Paths.HOME} element={<HomePage />} />
        <Route path={Paths.SIGN_UP} element={<SignUp />} />
        <Route path={Paths.LOGIN} element={<Login />} />
      </Routes>
      <NotificationsContainer />
    </>
  );
};

export default Pages;