import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = ({ freelancerId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const [response, setResponse] = useState("");

    // Fetch reviews for the freelancer
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/freelancers/${freelancerId}/reviews`
                );
                setReviews(response.data.reviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [freelancerId]);

    // Add a new review
    const handleAddReview = async () => {
        try {
            const clientId = "your-client-id"; // Replace with logged-in client ID
            const reviewData = {
                freelancerId,
                clientId,
                rating: newReview.rating,
                comment: newReview.comment,
            };

            const response = await axios.post("http://localhost:3000/reviews", reviewData);
            setReviews((prev) => [...prev, response.data.review]);
            setNewReview({ rating: 0, comment: "" });
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    // Add a response to a review
    const handleAddResponse = async (reviewId) => {
        try {
            const responseData = { response };
            const response = await axios.put(
                `http://localhost:3000/reviews/${reviewId}`,
                responseData
            );

            setReviews((prev) =>
                prev.map((review) =>
                    review._id === reviewId ? { ...review, response: responseData.response } : review
                )
            );
            setResponse("");
        } catch (error) {
            console.error("Error adding response:", error);
        }
    };

    return (
        <div>
            <h3>Reviews</h3>

            <div>
                <h4>Leave a Review</h4>
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                />
                <textarea
                    placeholder="Comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                ></textarea>
                <button onClick={handleAddReview}>Submit Review</button>
            </div>

            <div>
                {reviews.map((review) => (
                    <div key={review._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.comment}</p>
                        <p>Response: {review.response || "No response yet"}</p>

                        {/* Freelancer Response Form */}
                        {!review.response && (
                            <div>
                                <textarea
                                    placeholder="Write a response"
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                ></textarea>
                                <button onClick={() => handleAddResponse(review._id)}>Submit Response</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
