import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Add from "../../Components/ToDoAdd/Add"
import List from "../../Components/ToDoLists/List"
import {listContext} from "../../Helpers/Context"

const Home = () => {
  const [list, setList] = useState([])
  const navigaet = useNavigate()
  const auth = getAuth();

//   firebase.auth().onAuthStateChanged(user => {
//     user ? history.push("/dashboard") : history.push("/login");
//     renderApp();
//  });
// useEffect(() => {
  
//   redirector()
  
// }, [])

// const redirector = async () => {
//   const user = await auth.currentUser
//   if (user) {
//     return navigaet("/")
//   }else{
//     navigaet("/home")
//   }
// }
  return (
    <div className='row'>
      <listContext.Provider value={{list,setList}} >
        <Add />
        <List />
      </listContext.Provider>
    </div>
  )
}


export default Home