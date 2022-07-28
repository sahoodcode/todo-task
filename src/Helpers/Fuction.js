import { db } from '../firebase-config'
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
const uid = user.uid




 export const AllLists = async () => {
    const q = query(collection(db, uid))
    let data = []
    setList([])
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
        setList(data)
        console.log(data);
    })}