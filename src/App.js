import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomePage";

const PrivateRoute = ({ authorized }) => {
  return authorized ? <Outlet/> : <Navigate to="/login" />;
}

function App() {
  const authorized = useSelector((state) => state.signInStore.isAuthorized);

  return (
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute authorized={authorized}/>}>
            <Route path='/home' element={<HomePage/>} />
          </Route>
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </Router>
  );
}

export default App;
