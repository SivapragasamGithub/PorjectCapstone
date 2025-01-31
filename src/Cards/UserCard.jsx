import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { json, useNavigate, useParams } from "react-router-dom";
import userContext from "../UserContext";

function UserCard({ user }) {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [userType, setUserType] = useState("");
    const [isApplied, setIsApplied] = useState(false); // State to track if the job is applied

    const { hired, setHired } = useContext(userContext);
    const navigate = useNavigate();
    const { id } = useParams

    // Check if the job is already applied on component mount
    useEffect(() => {
        const storedCandidates = JSON.parse(localStorage.getItem('HiredCandidates')) || [];
        if (storedCandidates.includes(user.name)) {
            setIsApplied(true);
        }
    }, [user.name]);

    // Check if the current user is a candidate or an employer
    useEffect(() => {
        const currentUserType = localStorage.getItem("userType");
        setUserType(currentUserType);
    }, []);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://project-backend-vdkg.onrender.com/freelancers/${user._id}/reviews`);
                setReviews(response.data.reviews || []);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [id]);

    // Handle review submission by candidate
    const handleSubmitReview = async () => {
        if (rating === 0 || comment === "") {
            alert("Please provide a rating and a comment.");
            return;
        }

        try {
            const reviewData = {
                freelancerId: user._id,
                clientId: localStorage.getItem("userId"),
                // clientemail: localStorage.getItem("userEmail"),
                rating,
                comment,
            };

            const response = await axios.post("https://project-backend-vdkg.onrender.com/reviews", reviewData);

            if (response.data) {
                // Update the reviews list with the new review
                setReviews((prevReviews) => [response.data.review, ...prevReviews]);
                setRating(0);
                setComment("");
                alert("Review submitted successfully.");
            } else {
                alert("Failed to submit review.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const handleApply = () => {
        const userType = localStorage.getItem("userType")
        if (userType !== "employer") {
            alert("User Authentication Error");
        } else {
            const storedHired = JSON.parse(localStorage.getItem("hired")) || [];
            console.log("the previous hired is:", storedHired);
            const updatedHired = [...storedHired, user.name];
            console.log("the new hired is:", updatedHired);
            localStorage.setItem("hired", JSON.stringify(updatedHired));
            setHired(updatedHired);
            setIsApplied(true)// Mark the job as applied
            alert(`${user.name} Hired successfully `);
        }

    };

    return (
        <div className="container">
            <div className="m-1">
                <div className="card text-center">
                    <div className="card-header fs-3 text-uppercase">{user.name}</div>
                    <div className="card-body d-flex">
                        <div>
                            <img
                                src={user.photo}
                                alt=""
                                style={{ height: "300px", width: "300px", margin: "15px" }}
                            />
                        </div>
                        <div>
                            <h5 className="card-title">{user.role}</h5>
                            <p>{user.experience}</p>
                            <p className="card-text">{user.description}</p>
                            <p className="fs-3">Skills</p>
                            <div className="d-flex">
                                <div className="column text-start">
                                    <ul>
                                        {user.skills.split(",").map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {isApplied ? (
                                <button className="btn btn-success" disabled>
                                    Hired
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={handleApply}>
                                    Hire
                                </button>
                            )}
                            {/* <button className="btn btn-primary" onClick={handleApply}>
                                Hire
                            </button> */}
                            {/* <button className="btn btn-primary m-3" onClick={navigate(`/Profile/${user._id}`)} >
                                View
                            </button> */}
                            {/* <p>
                                <strong>Hired:</strong>{" "}
                                {Array.isArray(hired) && hired.length > 0 ? hired.join(", ") : "None"}
                            </p> */}

                        </div>
                    </div>
                    <div className="card-footer text-body-secondary text-start">
                        <h5 className="mt-3">Reviews and Ratings:</h5>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className="border-bottom mb-2">
                                    <strong>Rating:</strong> {review.rating} ⭐<br />
                                    <strong>Comment:</strong>{review.comment}
                                    <br />
                                    {review.response && (
                                        <div>
                                            <strong>Response:</strong> {review.response}
                                        </div>
                                    )}
                                    <div className="text-end text-muted">
                                        <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews available yet.</p>
                        )}
                        {/* Display review form for candidates only */}
                        {userType === "employer" && (
                            <div className="mt-3">
                                <h5>Submit a Review</h5>
                                <div className="mb-2">
                                    <label>Rating:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        max="5"
                                        value={rating}
                                        onChange={(e) => setRating(Number(e.target.value))}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Comment:</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                </div>
                                <button className="btn btn-primary" onClick={handleSubmitReview}>
                                    Submit Review
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;

