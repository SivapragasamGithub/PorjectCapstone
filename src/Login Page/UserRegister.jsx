import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UserRegister() {

    const navigate = useNavigate();
    const { id } = useParams()
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validate: (values) => {
            let error = {}

            if (values.username == "") {
                error.username = "please enter a valid user Name"
            }
            if (values.email == "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Please enter Valid Email"
            }
            if (values.password == "" || values.password.length < 8) {
                error.password = "Please enter Valid Password"
            }
            return error
        },
        onSubmit: async (values) => {
            // console.log(values);
            try {
                const response = await axios.post("https://project-backend-vdkg.onrender.com/userregister", values)
                // console.log(values);                
                navigate("/usermodal")
            } catch (error) {
                alert("something wrong in Userregister")
            }
        }
    })

    return (
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                    <div className="card text-black" style={{ borderRadius: "25px" }}>
                        <div className="card-body p-md-5" >
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                <input type="text" name='username' value={formik.values.username} onChange={formik.handleChange} className="form-control" placeholder='Enter Username' />
                                                <label className="form-label" for="form3Example1c">User Name</label>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Enter Email' className="form-control" />
                                                <label className="form-label" >Your Email</label>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Enter user Password' className="form-control" />
                                                <label className="form-label" >Password</label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        className="img-fluid" alt="Sample image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRegister