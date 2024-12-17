import React, { useState } from "react";
import EmployerCards from "./EmployerCards";
import UserCard from "./UserCard";

function ParentComponent({ user, employers }) {
    const [appliedCompanies, setAppliedCompanies] = useState([]);

    const handleApply = (company) => {
        if (!appliedCompanies.includes(company)) {
            setAppliedCompanies((prev) => [...prev, company]);
        }
    };

    return (
        <div className="container">
            <h2>Employer Cards</h2>
            {employers.map((employer, index) => (
                <EmployerCards key={index} employer={employer} onApply={handleApply} />
            ))}

            <h2 className="mt-4">User Card</h2>
            <UserCard user={user} appliedCompanies={appliedCompanies} />
        </div>
    );
}

export default ParentComponent;
