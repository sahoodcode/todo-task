import React, { useState } from 'react'
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from './Components/ToDoAdd/Add';
import List from './Components/ToDoLists/List';
import { listContext } from "./Helpers/Context"


function App() {
  const [list, setList] = useState([])

  return (
    <div >
      <listContext.Provider value={{ list, setList }} >
        {/* <BrowserRouter  > */}
        <BrowserRouter basename="/todo-task" >

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
          </Routes>

        </BrowserRouter>
      </listContext.Provider>
    </div>
  );
}

export default App;
