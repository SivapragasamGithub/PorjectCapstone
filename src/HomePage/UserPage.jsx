import React from "react";
import UserCard from "../Cards/UserCard";
import Reviews from "../Reviews";

function UserPage({ candidates }) {
    return (
        <div className="container">
            <div className="row">
                {candidates.length > 0 ? (
                    candidates.map((user, index) => (
                        <UserCard key={index} user={user} candidates={candidates} />
                    ))
                ) : (
                    <p>No candidates found.</p>
                )}
            </div>
        </div>
    );
}

export default UserPage;
