// import React from 'react'

// function ResetPage() {
//     return (

//         <div class="container">
//             <div class="row justify-content-center">
//                 <div class="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
//                     <div class="card border-0 shadow-sm rounded-4">
//                         <div class="card-body p-3 p-md-4 p-xl-5">
//                             <div class="row">
//                                 <div class="col-12">
//                                     <div class="mb-5">
//                                         <h2 class="h3">Password Reset</h2>
//                                         <h3 class="fs-6 fw-normal text-secondary m-0">Provide the email address associated with your account to recover your password.</h3>
//                                     </div>
//                                 </div>
//                             </div>
//                             <form action="#!">
//                                 <div class="row gy-3 overflow-hidden">
//                                     <div class="col-12">
//                                         <div class="form-floating mb-3">
//                                             <input type="email" class="form-control" name="email" id="email" placeholder="name@example.com" required />
//                                             <label for="email" class="form-label">Email</label>
//                                         </div>
//                                     </div>
//                                     <div class="col-12">
//                                         <div class="d-grid">
//                                             <button class="btn bsb-btn-2xl btn-primary" type="submit">Reset Password</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default ResetPage


import React, { useState } from 'react';
import axios from 'axios';

function ResetPage() {
    const [email, setEmail] = useState('');
    const [type, setType] = useState('user'); // Default user type
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/reset-password', { email, type });
            console.log(response.data.message);

            setMessage(response.data.message); // Show success message
            setEmail(''); // Clear the input field
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Something went wrong. Please try again.');
            } else {
                setError('Failed to connect to the server. Please try again later.');
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-3 p-md-4 p-xl-5">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-5">
                                        <h2 className="h3">Password Reset</h2>
                                        <h3 className="fs-6 fw-normal text-secondary m-0">
                                            Provide the email address associated with your account to recover your password.
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row gy-3 overflow-hidden">
                                    {/* Email Input */}
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                id="email"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="email" className="form-label">Email</label>
                                        </div>
                                    </div>

                                    {/* User Type Dropdown */}
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <select
                                                className="form-select"
                                                id="type"
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                            >
                                                <option value="user">User</option>
                                                <option value="employer">Employer</option>
                                            </select>
                                            <label htmlFor="type">Account Type</label>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button className="btn bsb-btn-2xl btn-primary" type="submit">
                                                Reset Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Success Message */}
                            {message && (
                                <div className="alert alert-success mt-3" role="alert">
                                    {message}
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPage;
