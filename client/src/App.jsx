import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import AddIncome from './Components/AddIncome/AddIncome'

import AddExpense  from "./Components/AddExpense/AddExpense";
function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    incomes: [],
    expenses: [],
    totalIncome: 0,
    totalExpense: 0,
  });

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} user={user} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/:id/home"
            element={<Home user={user} setUser={setUser}/>}
          />
          <Route path="/:id/addincome" element={<AddIncome user={user}/>}/>
          <Route path="/:id/addexpense" element={<AddExpense user={user}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
