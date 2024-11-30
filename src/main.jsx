// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./UserContext"; // Import UserProvider
import { EmployersProvider } from "./EmployersContext";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <EmployersProvider>
                <App />
            </EmployersProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
