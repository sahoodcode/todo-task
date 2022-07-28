import React, { useContext } from 'react'
import Add from "../../Components/ToDoAdd/Add"
import List from "../../Components/ToDoLists/List"
import { listContext } from "../../Helpers/Context"

const Home = () => {
  return (
    <div className='row'>
      <Add />
      <List />
    </div>
  )
}


export default Home