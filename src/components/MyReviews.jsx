import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'
import useTitle from '../hooks/useTitle'

const MyReviews = () => {

  // Set page title
  useTitle('My Reviews');

  // Getting data from AuthContext
  const {user} = useContext(AuthContext);

  // Reviews state
  const [reviews, setReviews] = useState([]);

  // Fetch method: GET
  useEffect(() => {
    fetch(`http://localhost:8000/my-reviews/${user?.uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Set reviews to the state
          setReviews(data.data);
        } else {
          // Error toast
          toast.error(data.error, {
            autoClose: 1500, position: toast.POSITION.TOP_CENTER
          });
        };
      })
      .catch(error => {
        // Error toast
        toast.error(error.message, {
          autoClose: 1500, position: toast.POSITION.TOP_CENTER
        });
      });
  }, []);

  return (
    <div>
      {
        reviews.map(review => <p key={review?._id}>{review?.comment}</p>)
      }
    </div>
  )
};

export default MyReviews;