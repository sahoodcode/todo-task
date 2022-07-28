import React, { useContext, useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import "./List.css"
import { GoKebabVertical } from "react-icons/go";
import { FaSistrix } from "react-icons/fa"
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from '../../firebase-config'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { listContext } from "../../Helpers/Context"

function List() {
    const [search, setSearch] = useState('')
    const [uid, setUid] = useState('')
    const navigate = useNavigate()
    const { list, setList } = useContext(listContext)
    const auth = getAuth();

    useEffect(() => {

        const unsub = auth.onAuthStateChanged((authObj) => {
            unsub();
            if (authObj) {
                setUid(authObj.uid)
                listLoader()
            } else {
            }
        });
    }, [])

    const listLoader = async () => {
        const user = await auth.currentUser
        const uid = user.uid
        const colRef = collection(db, uid)
        getDocs(colRef)
            .then((snapshot) => {
                let data = []
                snapshot.docs.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id })
                    setList(data)

                })})
            .catch((err) => {
                alert(err.message)
            })}

    const StatusChanger = async (id, status) => {
        const user = auth.currentUser
        const uid = user.uid
        const frankDocRef = doc(db, uid, id)
        await updateDoc(frankDocRef, {
            status: status
        })}

    const listFilter = async (condition, id) => {
        const user = auth.currentUser
        const uid = user.uid
        const q = query(collection(db, uid), where(condition, "==", id))
        let data = []
        setList([])
        setSearch('')
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
            setList(data)
            console.log(data);
        })}

    const AllLists = async () => {
        const user = auth.currentUser
        const uid = user.uid
        const q = query(collection(db, uid))
        let data = []
        setList([])
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
            setList(data)
            console.log(data);
        })}

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/")
            console.log("loogiuut");
        }).catch((error) => {
            alert(error.message)
        })}

    return (
        <div className="col-12 col-md-6 home-right mt-5 ">
            <div className="d-flex justify-content-between px-3">
                <h4 className='ms-3' >TODO LIST </h4>
                <button
                    onClick={logout}
                    className='button-logout' >Logout</button>
            </div>
            <div className="login-content d-flex justify-content-between mt-4 p-3">
                <div className='mt-1 home-search' >
                    <input
                        type="text"
                        placeholder='Seach Title'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <FaSistrix
                        className='search-icon'
                        onClick={() => listFilter("title", search)} />
                </div>
                <Dropdown className='border' style={{ height: "2.5rem" }} >
                    <Dropdown.Toggle variant="muted" id="dropdown-basic">
                        Filter By
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => listFilter("status", "completed")} >
                            Completed</Dropdown.Item>
                        <Dropdown.Item onClick={() => listFilter("status", "favourite")} >
                            Favourite</Dropdown.Item>
                        <Dropdown.Item onClick={() => listFilter("status", "deleted")} >
                            Deleted</Dropdown.Item>
                        <Dropdown.Item onClick={AllLists} >
                            All</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="d-flex flex-column mt-5 home-todo-lists ">
                {list.map((obj, index) => <div> <div className='d-flex justify-content-between px-3' >
                    <div>
                        <h5>{obj.title}</h5>
                        <p>{obj.desc}</p>
                    </div>
                    <div className='align-self-center' >

                        <Dropdown style={{ height: "2.5rem" }} >
                            <Dropdown.Toggle variant="muted" id="dropdown-basic">
                                <GoKebabVertical />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => StatusChanger(obj.id, "completed")}>
                                    Completed</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => StatusChanger(obj.id, "favourite")}>
                                    Favourite</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => StatusChanger(obj.id, "deleted")}>
                                    Deleted</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                    <div className="home-todo-horizondal align-self-center mb-1"></div>
                </div>)}

            </div>
        </div>
    )

}

export default List
