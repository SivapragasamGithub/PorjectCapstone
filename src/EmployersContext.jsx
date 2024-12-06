import axios from "axios";
import { createContext, useEffect, useState } from "react";


const employersContext = createContext();

export const EmployersProvider = ({ children }) => {

    const [employer, setEmployer] = useState([]);
    const getData = async () => {
        // console.log("Before axios");
        try {
            const response = await axios.get("https://project-backend-vdkg.onrender.com/employers")
            // console.log(users.data);
            setEmployer(response.data)
        } catch (error) {
            alert("something went wrong on get FE")
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return <employersContext.Provider value={{ employer, setEmployer }}>
        {children}
    </employersContext.Provider>
}

export default employersContext;
