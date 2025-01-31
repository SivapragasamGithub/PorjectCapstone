// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// const userContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [candidat, setCandidate] = useState([]);
//     const [appliedCompany, setAppliedCompany] = useState("");
//     const [hired, setHired] = useState("")

//     // console.log(candidat);
//     const getData = async () => {
//         // console.log("Before axios");
//         try {
//             const users = await axios.get("https://project-backend-vdkg.onrender.com/users")
//             // console.log(users.data);
//             setCandidate(users.data)
//         } catch (error) {
//             alert("something went wrong on get FE")
//         }
//     }
//     useEffect(() => {
//         getData()
//     }, [])

//     return <userContext.Provider value={{ candidat, setCandidate, appliedCompany, setAppliedCompany, hired, setHired }}>
//         {children}
//     </userContext.Provider>
// }

// export default userContext;

import { createContext, useState, useEffect } from "react";
import axios from "axios";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [candidat, setCandidate] = useState([]);
    const [appliedCompany, setAppliedCompany] = useState([]);
    const [hired, setHired] = useState([]);

    // Load state from localStorage on initial render
    useEffect(() => {
        const storedAppliedCompanies = JSON.parse(localStorage.getItem('appliedCompanies')) || [];
        const storedHiredCandidates = JSON.parse(localStorage.getItem('hired')) || [];
        setAppliedCompany(storedAppliedCompanies);
        setHired(storedHiredCandidates);
    }, []);

    // Fetch candidates data
    const getData = async () => {
        try {
            const users = await axios.get("https://project-backend-vdkg.onrender.com/users");
            setCandidate(users.data);
        } catch (error) {
            alert("Something went wrong while fetching data");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <userContext.Provider value={{ candidat, setCandidate, appliedCompany, setAppliedCompany, hired, setHired }}>
            {children}
        </userContext.Provider>
    );
};

export default userContext;