import React from 'react'
import Add from "../../Components/ToDoAdd/Add"
import List from "../../Components/ToDoLists/List"

const Home = () => {

  return (
    <div className='row'>
      <Add />
      <List />
    </div>
  )
}


export default Home