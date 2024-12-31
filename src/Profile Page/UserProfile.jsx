import React, { useContext, useEffect, useState } from "react";
import userContext from "../UserContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const { candidat, appliedCompany, setAppliedCompany } = useContext(userContext);
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0);

  const fetchUser = async () => {
    try {
      if (id) {
        const response = await axios.get(`https://project-backend-vdkg.onrender.com/user/${id}`);
        console.log("the review while get profile is:", response.data);
        const userfromBE = response.data.user
        const reviewfromBE = response.data.reviews
        console.log("the userfromBE while get profile is:", userfromBE)
        console.log("the reviewfromBE while get profile is:", reviewfromBE)

        setUserDetail(userfromBE);
        setReviews(reviewfromBE || []);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  // Start editing a review
  const startEditing = (review) => {
    setEditingReview(review._id);
    setUpdatedComment(review.comment);
    setUpdatedRating(review.rating);
  };
  // Cancel editing
  const cancelEditing = () => {
    setEditingReview(null);
    setUpdatedComment("");
    setUpdatedRating(0);
  };
  // Save updated review (PUT request)
  const handleSaveReview = async () => {
    try {
      const updatedReview = {
        comment: updatedComment,
        rating: updatedRating,
      };

      const response = await axios.put(
        `https://project-backend-vdkg.onrender.com/reviews/${editingReview}`,
        updatedReview
      );

      if (response.status === 200) {
        alert("Review updated successfully!");

        // Update the reviews list with the updated review
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === editingReview ? { ...review, ...updatedReview } : review
          )
        );
        cancelEditing();
      }
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update review.");
    }
  };

  return (
    <div className="container">
      {userDetail ? (
        <div className="container m-3">
          <div className="card mb-3" style={{ maxWidth: "auto", height: "auto" }}>
            <div className="container d-flex justify-content-center">
              <Link className='btn btn-primary m-1' to={`/usermodal/${userDetail._id}`}>Edit</Link>
            </div>
            <div className="row g-1">
              <div className="col-md-4 mt-8">
                <p>
                  <strong>Applied Company:</strong> {appliedCompany.join(", ") || "None"}
                </p>
                <br />
                <br />
                <img
                  src={userDetail.photo}
                  className="img-fluid rounded-start"
                  alt={userDetail.name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p>
                    <strong>Name:</strong> {userDetail.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userDetail.email}
                  </p>
                  <p>
                    <strong>Description:</strong> {userDetail.description}
                  </p>
                  <p>
                    <strong>PhoneNumber:</strong> {userDetail.PhoneNumber}
                  </p>
                  <p>
                    <strong>experience:</strong> {userDetail.experience}
                  </p>
                  <p>
                    <strong>role:</strong> {userDetail.role}
                  </p>
                  <p>
                    <strong>Projects:</strong>
                  </p>
                  <div className='d-flex'>
                    <div className='column text-start'>
                      {userDetail.projects && userDetail.projects.length > 0 ? (
                        userDetail.projects.map((project, index) => (
                          <div key={index}>
                            <p>projectName:  {project.projectName}</p>
                            <p>projectDescription:  {project.projectDescription}</p>
                            <a href={project.projectLink} target="_blank" rel="noopener noreferrer">Project Link</a>
                          </div>
                        ))
                      ) : (
                        <p>No projects available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Reviews Section */}
              <div className="reviews-section">
                <h4>Reviews:</h4>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id} className="review-item border-bottom mb-3">
                      {editingReview === review._id ? (
                        <div>
                          <label>Rating:</label>
                          <input
                            type="number"
                            className="form-control mb-2"
                            min="1"
                            max="5"
                            value={updatedRating}
                            onChange={(e) => setUpdatedRating(e.target.value)}
                          />
                          <label>Comment:</label>
                          <textarea
                            className="form-control mb-2"
                            rows="3"
                            value={updatedComment}
                            onChange={(e) =>
                              setUpdatedComment(e.target.value)
                            }
                          ></textarea>
                          <button
                            className="btn btn-success me-2"
                            onClick={handleSaveReview}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <strong>Rating:</strong> {review.rating} ⭐
                          <br />
                          <strong>Comment:</strong> {review.comment}
                          <br />
                          <button
                            className="btn btn-primary btn-sm mt-2"
                            onClick={() => startEditing(review)}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>

                  ))
                ) : (
                  <p>No reviews available.</p>
                )}
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

export default UserProfile;
