import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ onSearch, onemployersearch }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("candidates"); // Default search for candidates
    const [employersearchType, setemployerSearchType] = useState("employers"); // Default search for 
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    // Check authentication state on component mount
    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(authStatus === "true");
    }, []);
    const handleLogout = () => {
        // Clear localStorage and reset authentication state
        localStorage.clear();
        setIsAuthenticated(false);
        navigate("/login");
    };
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleSearchClick = () => {
        // if (onSearch) {
        //     onSearch(query, searchType);
        // }
        if (onemployersearch) {
            onemployersearch(query, employersearchType)
        }
    };

    // const handleSearchClick = () => {
    //     if (searchType === "candidates" && onSearch) {
    //         onSearch(query, searchType);
    //     } else if (searchType === "employers" && onemployersearch) {
    //         onemployersearch(query, employersearchType);
    //     }
    // };


    const handleProfile = () => {
        if (userType === "employer") {
            navigate(`/employerProfile/${userId}`);
        } else if (userType === "candidate") {
            navigate(`/Profile/${userId}`);
        } else {
            alert("User type not identified. Please log in again.");
        }
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/jobspage">
                    Freelancer Market Place
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to={"/jobspage"}>
                                <h4>Jobs</h4>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to={"/userpage"}>
                                <h4>Candidate</h4>
                            </Link>
                        </li>
                    </ul>
                    {/* <div className="col-lg-3 d-flex align-items-center"> */}
                    {/* Dropdown for Search Type */}
                    {/* <select
                            className="form-select me-2"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value="candidates">Candidates</option>
                            <option value="employers">Employers</option>
                        </select> */}
                    {/* Search Bar */}
                    {/* <input
                            type="text"
                            className="form-control"
                            placeholder={
                                searchType === "candidates"
                                    ? "Search candidates by name or skills"
                                    : "Search employers by company or skills"
                            }
                            value={query}
                            onChange={handleInputChange}
                        /> */}
                    {/* </div> */}
                    <div className="col-lg-3 d-flex align-items-center">
                        {/* Dropdown for Search Type */}
                        <select
                            className="form-select me-2"
                            value={employersearchType}
                            onChange={(e) => {
                                // if (searchType === "candidates") {
                                //     setSearchType(e.target.value);
                                // } else {
                                setemployerSearchType(e.target.value);
                                // }
                            }}
                            onClick={(e) => {
                                // if (searchType === "candidates") {
                                //     setSearchType(e.target.value);
                                // } else {
                                setemployerSearchType(e.target.value);
                            }
                                // }
                            }
                        >
                            <option value="candidates">Candidates</option>
                            <option value="employers">Employers</option>
                        </select>

                        {/* Search Bar */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder={
                                searchType === "candidates"
                                    ? "Search candidates by name or skills"
                                    : "Search employers by company or skills"
                            }
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-outline-success m-1" onClick={handleSearchClick}>
                        Search
                    </button>
                    {!localStorage.userId ? (
                        <Link className="btn primary me-2" to="/login">
                            Login
                        </Link>
                    ) : (
                        <>
                            <button className="btn primary me-2" onClick={handleProfile}>
                                Profile
                            </button>
                            <button className="btn primary me-2" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
