import React from 'react'
import EmployerCards from '../Cards/EmployerCards';

function HomePage({ employment,handleappclick }) {
const companyname = ()=> handleappclick()
    return (
        <div className="container">
            <div className="row">
                {employment.length > 0 ? (
                    employment.map((employer, index) =>
                        <EmployerCards key={index} employer={employer} handleclick={companyname} />
                    )
                ) : (
                    <p>No employers found.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage