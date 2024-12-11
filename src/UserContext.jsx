import { createContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [candidat, setCandidate] = useState([]);
    // console.log(candidat);
    const getData = async () => {
        // console.log("Before axios");
        try {
            const users = await axios.get("https://project-backend-vdkg.onrender.com/users")
            // console.log(users.data);
            setCandidate(users.data)
        } catch (error) {
            alert("something went wrong on get FE")
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return <userContext.Provider value={{ candidat, setCandidate }}>
        {children}
    </userContext.Provider>
}

export default userContext;