import React from 'react'

function EmployerCards({ employer }) {
  return (
    <div className="container">
      <div className='m-1'>
        <div className="card text-center">
          <div className="card-header">
            {employer.company}
          </div>
          <div className="card-body d-flex">
            <div>
              <img src={employer.photo} style={{ height: "300px", width: "300px", margin: "15px" }} />
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
              <a href="#" className="btn btn-primary">Apply</a>
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
  )
}

export default EmployerCards