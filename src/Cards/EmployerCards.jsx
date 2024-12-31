import React, { useContext, useState } from 'react';
import userContext from '../UserContext';

function EmployerCards({ employer }) {
  const { setAppliedCompany, appliedCompany } = useContext(userContext);
  const [isApplied, setIsApplied] = useState(false); // State to track if the job is applied

  const handleApply = () => {
    setAppliedCompany(...appliedCompany, employer.company);
    setIsApplied(true); // Mark the job as applied
    alert("Applied successfully");
  };

  return (
    <div className="container">
      <div className='m-1'>
        <div className="card text-center">
          <div className="card-header">
            {employer.company}
          </div>
          <div className="card-body d-flex">
            <div>
              <img src={employer.photo} style={{ height: "300px", width: "300px", margin: "15px" }} alt="Company Logo" />
            </div>
            <div>
              <h6 className="card-title">{employer.HRname}</h6>
              <p className='fs-3'>Job description</p>
              <p className="card-text fw-bold">{employer.jobdescription}</p>
              <p className='fs-3'>Skills needed</p>
              <div className='d-flex '>
                <div className='column text-start'>
                  <ul>
                    {/* Dynamically render skills */}
                    {employer.skillsneeded.split(',').map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Conditional rendering for the button */}
              {isApplied ? (
                <button className="btn btn-success" disabled>
                  Applied
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleApply}>
                  Apply
                </button>
              )}
            </div>
          </div>
          <div className="card-footer text-body-secondary text-end ">
            <div className='d-flex'>
              <div className='column '>
                <div>Applicants</div>
              </div>
            </div>
            <div>Posted date:</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerCards;
