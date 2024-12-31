import React, { useContext, useEffect, useState } from "react";
import employersContext from "../EmployersContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import userContext from "../UserContext";

function EmployerProfile() {
  const { employer } = useContext(employersContext);
  const { candidat, appliedCompany, setAppliedCompany,hired } = useContext(userContext);
  const { id } = useParams();
  const [employerDetail, setEmployerDetail] = useState(null);

  const fetchEmployer = async () => {
    try {
      if (id) {
        console.log("Fetching employer with ID:", id);
        const response = await axios.get(`https://project-backend-vdkg.onrender.com/employer/${id}`);
        setEmployerDetail(response.data);
        console.log("Employer data fetched:", response.data);
      }
    } catch (error) {
      console.error("Error fetching employer data:", error);
    }
  };

  useEffect(() => {
    fetchEmployer();
  }, [id]);

  return (
    <div className="container">
      {employerDetail ? (
        <div className="container m-3">
          <div className="card mb-3" style={{ maxWidth: "auto", height: "auto" }}>
            <div className="container d-flex justify-content-center">
              <Link
                className="btn btn-primary m-1"
                to={`/employermodal/${employerDetail._id}`}
              >
                Edit
              </Link>
            </div>
            <div className="row g-1">
              <div className="col-md-4 mt-8">
                <img
                  src={employerDetail.photo}
                  className="img-fluid rounded-start"
                  alt={employerDetail.company}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p>
                    <strong>Hired:</strong> {hired || "None"}
                  </p>
                  <p>
                    <strong>Company:</strong> {employerDetail.company}
                  </p>
                  <p>
                    <strong>HR Name:</strong> {employerDetail.HRname}
                  </p>
                  <p>
                    <strong>Email:</strong> {employerDetail.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {employerDetail.PhoneNumber}
                  </p>
                  <p>
                    <strong>Job Description:</strong> {employerDetail.jobdescription}
                  </p>
                  <p>
                    <strong>Experience Required:</strong> {employerDetail.experiencerequired}
                  </p>
                  <p>
                    <strong>Skills Needed:</strong> {employerDetail.skillsneeded}
                  </p>
                  <p>
                    <strong>Role:</strong> {employerDetail.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EmployerProfile;
