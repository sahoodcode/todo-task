import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Add from "../../Components/ToDoAdd/Add"
import List from "../../Components/ToDoLists/List"
import {listContext} from "../../Helpers/Context"
import Redirector from '../Redirector'

const Home = () => {
  const [list, setList] = useState([])
  const [uid, setuid] = useState('')
  const navigate = useNavigate()
  const auth = getAuth();


useEffect(() => {
  const redirector = async () => {
    const user = await auth.currentUser
    const uid = user.uid
    setuid(uid)
    
  }
  redirector()
  
}, [])
const navigator = () => {
  navigate("/")
}

  return (
    <div className='row'>
      <listContext.Provider value={{list,setList}} >
       { uid ? <>  <Add />
        <List /> </> : <> <Redirector />   </>}
      </listContext.Provider>
    </div>
  )
}


export default Home