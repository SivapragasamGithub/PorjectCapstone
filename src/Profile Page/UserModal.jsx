import axios from 'axios';
import { useFormik, FieldArray, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function UserModal() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [users, setUsers] = useState([])
    console.log("the user for state is:", users);


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            PhoneNumber: "",
            experience: "",
            skills: "",
            role: "",
            description: "",
            photo: "",
            projects: [
                {
                    projectName: "",
                    projectDescription: "",
                    projectLink: ""
                }
            ]
        },
        validate: (values) => {
            let errors = {};

            if (!values.name) {
                errors.name = "Please enter name";
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

            if (!values.experience) {
                errors.experience = "Please enter experience";
            } else if (isNaN(values.experience) || values.experience < 0 || values.experience > 40) {
                errors.experience = "Experience must be a valid number between 0 and 40 years";
            }

            if (!values.skills) {
                errors.skills = "Please enter skills";
            }

            if (!values.role) {
                errors.role = "Please enter role";
            }

            if (!values.description) {
                errors.description = "Please enter description";
            }

            values.projects.forEach((project, index) => {
                if (!project.projectName) {
                    if (!errors.projects) errors.projects = [];
                    errors.projects[index] = { projectName: "Please enter project name" };
                }
                if (!project.projectDescription) {
                    if (!errors.projects) errors.projects = [];
                    errors.projects[index] = { ...errors.projects[index], projectDescription: "Please enter project description" };
                }
                if (!project.projectLink || !/^(https?:\/\/)?([\w\d-]+\.){1,}\w{2,}(\/[\w\d#?&=.-]*)*\/?$/i.test(project.projectLink)) {
                    if (!errors.projects) errors.projects = [];
                    errors.projects[index] = { ...errors.projects[index], projectLink: "Please enter valid project link" };
                }
            });

            return errors;
        },
        onSubmit: async (values) => {
            try {
                if (id) {
                    const user = await axios.put(`https://project-backend-vdkg.onrender.com/user/${id}`, values)
                    console.log("bfgbvdfs:", user.data);
                    setUsers(user.data)
                    navigate(`/profile/${id}`)
                } else {
                    const regiterData = await axios.post("https://project-backend-vdkg.onrender.com/user", values);
                    console.log("The register Data while model submit:", regiterData);
                    const _id = regiterData.data._id
                    navigate(`/profile/${_id}`)
                    // navigate("/login")
                }
            } catch (error) {
                alert("Something went wrong");
            }
        }
    })
    const fetchuserdata = async () => {
        if (id) {
            try {
                const response = await axios.get(`https://project-backend-vdkg.onrender.com/user/${id}`)
                console.log("thresponse after usermodal edited from back end is:", response.data.user);
                const user = response.data.user
                const review = response.data.reviews
                formik.setValues(user)
            } catch (error) {
                alert("Failed to fetch character data")
            }

        }
    }

    useEffect(() => {
        fetchuserdata()
    }, [id]);
    return (
        <Formik >
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
                                    <label>Name</label>
                                    <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} className='form-control' />
                                    {formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
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
                                    <label>Experience (years)</label>
                                    <input type="text" name='experience' value={formik.values.experience} onChange={formik.handleChange} className='form-control' />
                                    {formik.errors.experience ? <div className="text-danger">{formik.errors.experience}</div> : null}
                                </div>

                                {/* Skills Field */}
                                <div className="col-lg-12">
                                    <label>Skills</label>
                                    <input type="text" name='skills' value={formik.values.skills} onChange={formik.handleChange} className='form-control' />
                                    {formik.errors.skills ? <div className="text-danger">{formik.errors.skills}</div> : null}
                                </div>

                                {/* Role Field */}
                                <div className="col-lg-12">
                                    <label>Role</label>
                                    <input type="text" name='role' value={formik.values.role} onChange={formik.handleChange} className='form-control' />
                                    {formik.errors.role ? <div className="text-danger">{formik.errors.role}</div> : null}
                                </div>

                                {/* Description Field */}
                                <div className="col-lg-12">
                                    <label>Description</label>
                                    <input type="text" name='description' value={formik.values.description} onChange={formik.handleChange} className='form-control' />
                                    {formik.errors.description ? <div className="text-danger">{formik.errors.description}</div> : null}
                                </div>

                                {/* Photo Field */}
                                <div className="col-lg-12">
                                    <label>Photo URL</label>
                                    <input type="text" name='photo' value={formik.values.photo} onChange={formik.handleChange} className='form-control' />
                                </div>

                                {/* Projects Section */}
                                <FieldArray name="projects">
                                    {({ push, remove }) => (
                                        <div>
                                            {formik.values.projects.map((project, index) => (
                                                <div key={index}>
                                                    <h5>Project {index + 1}</h5>

                                                    {/* Project Name Field */}
                                                    <div className="col-lg-12">
                                                        <label>Project Name</label>
                                                        <input
                                                            type="text"
                                                            name={`projects[${index}].projectName`}
                                                            value={project.projectName}
                                                            onChange={formik.handleChange}
                                                            className="form-control"
                                                        />
                                                        {formik.errors.projects?.[index]?.projectName && (
                                                            <div className="text-danger">{formik.errors.projects[index].projectName}</div>
                                                        )}
                                                    </div>

                                                    {/* Project Description Field */}
                                                    <div className="col-lg-12">
                                                        <label>Project Description</label>
                                                        <input
                                                            type="text"
                                                            name={`projects[${index}].projectDescription`}
                                                            value={project.projectDescription}
                                                            onChange={formik.handleChange}
                                                            className="form-control"
                                                        />
                                                        {formik.errors.projects?.[index]?.projectDescription && (
                                                            <div className="text-danger">{formik.errors.projects[index].projectDescription}</div>
                                                        )}
                                                    </div>

                                                    {/* Project Link Field */}
                                                    <div className="col-lg-12">
                                                        <label>Project Link</label>
                                                        <input
                                                            type="text"
                                                            name={`projects[${index}].projectLink`}
                                                            value={project.projectLink}
                                                            onChange={formik.handleChange}
                                                            className="form-control"
                                                        />
                                                        {formik.errors.projects?.[index]?.projectLink && (
                                                            <div className="text-danger">{formik.errors.projects[index].projectLink}</div>
                                                        )}
                                                    </div>

                                                    {/* Remove Project Button */}
                                                    <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                                                        Remove Project
                                                    </button>
                                                    <hr />
                                                </div>
                                            ))}

                                            {/* Add More Projects Button */}
                                            <button type="button" className="btn btn-success" onClick={() => push({ projectName: "", projectDescription: "", projectLink: "" })}>
                                                Add Another Project
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Formik>
    );
}

export default UserModal;
