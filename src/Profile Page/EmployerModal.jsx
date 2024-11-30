import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


function EmployerModal() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [employers, setemployers] = useState([])
    console.log("the user for state is:", employers);


    const formik = useFormik({
        initialValues: {
            company: "",
            HRname: "",
            email: "",
            PhoneNumber: "",
            experiencerequired: "",
            skillsneeded: "",
            role: "",
            jobdescription: "",
            photo: ""
        },
        validate: (values) => {
            let errors = {};
            if (!values.company) {
                errors.company = "Please enter company";
            }
            if (!values.HRname) {
                errors.HRname = "Please enter HRname";
            }
            if (!values.email) {
                errors.email = "Please enter email";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Please enter a valid email";
            }
            if (!values.PhoneNumber) {
                errors.PhoneNumber = "Please enter phone number";
            } else if (!/^\d{10}$/.test(values.PhoneNumber)) {
                errors.PhoneNumber = "Phone number must be exactly 10 digits";
            }

            if (!values.experiencerequired) {
                errors.experiencerequired = "Please enter experience";
            } else if (isNaN(values.experiencerequired) || values.experiencerequired < 0 || values.experiencerequired > 40) {
                errors.experiencerequired = "Experience must be a valid number between 0 and 40 years";
            }

            if (!values.skillsneeded) {
                errors.skillsneeded = "Please enter skillsneeded";
            }

            if (!values.role) {
                errors.role = "Please enter role";
            }

            if (!values.jobdescription) {
                errors.description = "Please enter jobdescription";
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                if (id) {
                    const response = await axios.put(`http://localhost:3000/employer/${id}`, values)
                    setemployers(response.data)
                    navigate(`/employerProfile/${id}`)
                } else {
                    const regiterData = await axios.post("http://localhost:3000/employer", values);
                    console.log("The register Data while model submit:", regiterData);
                    const _id = regiterData.data._id
                    navigate(`/employerProfile/${_id}`)
                }
            } catch (error) {
                alert("Something went wrong");
            }
        }
    })
    const fetchemployerdata = async () => {
        if (id) {
            try {
                const response = await axios.get(`http://localhost:3000/employer/${id}`)
                console.log("thresponse after usermodal edited from back end is:", response.data);

                formik.setValues(response.data)
            } catch (error) {
                alert("Failed to fetch character data")
            }

        }
    }

    useEffect(() => {
        fetchemployerdata()
    }, [id]);

    return (

        <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog" role='document'>
                <div className="modal-content" style={{ width: "500px" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">User Details</h5>
                        </div>
                        <div className="modal-body">
                            {/* Name Field */}
                            <div className="col-lg-12">
                                <label>company</label>
                                <input type="text" name='company' value={formik.values.company} onChange={formik.handleChange} className='form-control' />
                                {formik.errors.company ? <div className="text-danger">{formik.errors.company}</div> : null}
                            </div>
                            <div className="col-lg-12">
                                <label>HRname</label>
                                <input type="text" name='HRname' value={formik.values.HRname} onChange={formik.handleChange} className='form-control' />
                                {formik.errors.HRname ? <div className="text-danger">{formik.errors.HRname}</div> : null}
                            </div>

                            {/* Email Field */}
                            <div className="col-lg-12">
                                <label>Email</label>
                                <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} className='form-control' />
                                {formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                            </div>

                            {/* Phone Number Field */}
                            <div className="col-lg-12">
                                <label>Phone Number</label>
                                <input type="number" name='PhoneNumber' value={formik.values.PhoneNumber} onChange={formik.handleChange} className='form-control' />
                                {formik.errors.PhoneNumber ? <div className="text-danger">{formik.errors.PhoneNumber}</div> : null}
                            </div>

                            {/* Experience Field */}
                            <div className="col-lg-12">
                                <label>experiencerequired (years)</label>
                                <input type="text" name='experiencerequired' value={formik.values.experiencerequired} onChange={formik.handleChange} className='form-control' />
                                {formik.errors.experiencerequired ? <div className="text-danger">{formik.errors.experiencerequired}</div> : null}
                            </div>

                            {/* Skills Field */}
                            <div className="col-lg-12">
                                <label>skillsneeded</label>
                                <input type="text" name='skillsneeded' value={formik.values.skillsneeded} onChange={formik.handleChange} className='form-control' />
                                {formik.errors.skillsneeded ? <div className="text-danger">{formik.errors.skillsneeded}</div> : null}
                            </div>

                            {/* Role Field */}
                            <div className="col-lg-12">
                                <label>Role</label>
                                <input type="text" name='role' value={formik.values.role} onChange={formik.handleChange} className='form-control' />
                                {formik.errors.role ? <div className="text-danger">{formik.errors.role}</div> : null}
                            </div>

                            {/* Description Field */}
                            <div className="col-lg-12">
                                <label>jobdescription</label>
                                <input type="text" name='jobdescription' value={formik.values.jobdescription} onChange={formik.handleChange} className='form-control' />
                                {formik.errors.jobdescription ? <div className="text-danger">{formik.errors.jobdescription}</div> : null}
                            </div>

                            {/* Photo Field */}
                            <div className="col-lg-12">
                                <label>Photo URL</label>
                                <input type="text" name='photo' value={formik.values.photo} onChange={formik.handleChange} className='form-control' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Close</button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default EmployerModal