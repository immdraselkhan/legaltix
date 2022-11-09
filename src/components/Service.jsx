import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import Rating from 'react-rating'
import { FaStar } from 'react-icons/fa'
import 'react-photo-view/dist/react-photo-view.css'
import { toast } from 'react-toastify'

const Service = () => {

  // Getting data from AuthContext
  const {user} = useContext(AuthContext);

  // Getting the params
  const {slug} = useParams();

  // Refresh state for useEffect
  const [refresh, setRefresh] = useState(false);

  // Input rating state
  const [star, setStar] = useState(null);

  // All service state
  const [service, setService] = useState([]);

  // All service state
  const [reviews, setReviews] = useState([]);

  // Fetch method: GET
  useEffect(() => {
    fetch(`http://localhost:8000/service/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Set data to the state
          setService(data.data.service);
          // Set reviews to the state
          setReviews(data.data.reviews)
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
  }, [refresh]);

  // Handle add review
  const handleAddReview = e => {
    // Disabling form default behavior
    e.preventDefault();
    // Create object using form data to post server
    const review = {
      userId: user?.uid,
      name: e.target.name.value,
      star,
      comment: e.target.comment.value,
      userPhoto: user?.photoURL || '',
      serviceId: service?._id,
    };
    // Fetch method: POST
    fetch(`http://localhost:8000/add-review/${slug}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        // Refresh the useEffect
        setRefresh(!refresh);
        // Form reset
        e.target.reset();
        // Successful toast
        toast.success(data.message, {
          autoClose: 1500, position: toast.POSITION.TOP_CENTER
        });
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
  };

  return (
    <>
      <section>
        <div>
          <PhotoProvider>
            <PhotoView src={service?.thumbnail?.url}>
              <img src={service?.thumbnail?.url} alt="" />
            </PhotoView>
          </PhotoProvider>
          <h3>{service?.title}</h3>
          <p>{service?.description}</p>
          <img src={service?.userPhoto?.url} alt="" />
          <p>{service?.userName}</p>
          <p>{service?.price}</p>
          <Rating readonly placeholderRating={`${service?.rating}`} emptySymbol= {<FaStar className="text-black dark:text-white" />} placeholderSymbol= {<FaStar className="text-primary" />}/>
        </div>
      </section>

      <section>
        {
        user?.uid ? 
        (
          reviews?.find(review => review?.userId === user?.uid) === undefined ? (
            <form onSubmit={handleAddReview}>
              <input type="text" name="name" placeholder="Enter your name" defaultValue={user?.displayName} readOnly={user?.displayName && true} required />
              <br />
              <textarea name="comment" cols="30" rows="10" placeholder="Enter review details" required />
              <br />
              <Rating onClick={(value) => setStar(value)} emptySymbol={<FaStar className="text-black dark:text-white" />} fullSymbol={<FaStar className="text-primary" />} />
              <br />
              <input type="submit" value="Submit" />
            </form>) : 'Already reviewed'
        ) : <h4>Please login to review <Link to="/login">Login</Link></h4>
        }

        <h2>All Reviews</h2>
        {reviews ? (
          reviews?.map(review => {
          return (
            <div key={review?._id}>
              <h5>{review?.name}</h5>
              <p>{review?.comment}</p>
              <Rating readonly placeholderRating={`${review?.star}`} emptySymbol= {<FaStar className="text-black dark:text-white" />} placeholderSymbol= {<FaStar className="text-primary" />}/>
              <img src={review?.userPhoto} alt="" />
            </div>
          )})
        ) : 'No review yet'}
      </section>
    </>
  )
};

export default Service;