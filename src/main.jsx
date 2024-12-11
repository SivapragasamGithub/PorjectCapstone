import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for ReactDOM in React 18
import App from "./App";
import { UserProvider } from "./UserContext";
import { EmployersProvider } from "./EmployersContext";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot

root.render(
    <React.StrictMode>
        <UserProvider>
            <EmployersProvider>
                <App />
            </EmployersProvider>
        </UserProvider>
    </React.StrictMode>
);

