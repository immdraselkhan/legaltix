import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/UserContext'
import Rating from 'react-rating'
import { Button, Modal} from 'flowbite-react'
import { FaStar } from 'react-icons/fa'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { toast } from 'react-toastify'
import useTitle from '../hooks/useTitle'

const MyReviews = () => {

  // Set page title
  useTitle('My Reviews');

  // Getting data from AuthContext
  const {user, userLogOut} = useContext(AuthContext);

  // Refresh state for useEffect
  const [refresh, setRefresh] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState([]);

  // Modal state
  const [show, setShow] = useState({modal: false, edit: false, trash: false});

  // Handle modal
  const handleModal = target => {
    // Modal open
    target === 'edit' ? setShow({modal: true, edit: true, trash: false}) : setShow({modal: true, edit: false, trash: true});
  };

  // Service id state
  const [serviceId, setServiceId] = useState('');

  // Old star state
  const [oldStar, setOldStar] = useState('');

  // New star state
  const [star, setStar] = useState(null);

  // Old comment state
  const [oldComment, setOldComment] = useState('');

  // Handle edit
  const handleEdit = (e) => {
    // // Disable default form behavior
    e.preventDefault();
    // Creating an object using the form data
    const modifiedReview = {comment: e.target.comment.value, oldStar, star};
    // Fetch method: PATCH
    fetch(`http://127.0.0.1:8000/my-reviews/edit/${serviceId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(modifiedReview)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Refresh the useEffect
        setRefresh(!refresh);
        // Form reset
        e.target.reset();
        // Successful toast
        toast.success(data.message, {
          autoClose: 1500, position: toast.POSITION.TOP_CENTER
        });
        // Modal close
        setShow({modal: false});
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

  // Handle trash
  const handleTrash = () => {
    // Fetch method: DELETE
    fetch(`http://127.0.0.1:8000/my-reviews/delete/${serviceId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({oldStar})
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Refresh the useEffect
        setRefresh(!refresh);
        // Successful toast
        toast.success(data.message, {
          autoClose: 1500, position: toast.POSITION.TOP_CENTER
        });
        // Modal close
        setShow({modal: false});
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

  // Fetch method: GET
  useEffect(() => {
    fetch(`http://localhost:8000/my-reviews/${user?.uid}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
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
        // Sign out the user
        userLogOut();
      };
    })
    .catch(error => {
      // Error toast
      toast.error(error.message, {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
    });
  }, [refresh]);

  return (
    <div>
      {reviews.length ? (
          reviews?.map(review => {
          return (
            <div key={review?._id}>
              <h5>{review?.name}</h5>
              <p>{review?.comment}</p>
              <Rating readonly placeholderRating={review?.star} emptySymbol= {<FaStar className="text-black dark:text-white" />} placeholderSymbol= {<FaStar className="text-primary" />}/>
              <img src={review?.userPhoto} alt="" />
              <div>
                <button data-id={review?.serviceId} data-star={review?.star} data-comment={review?.comment} onClick={(e) => {handleModal('edit'), setServiceId(e.target.getAttribute('data-id')), setOldStar(e.target.getAttribute('data-star')), setOldComment(e.target.getAttribute('data-comment'))}}>Edit</button>
                <button data-id={review?.serviceId} data-star={review?.star} onClick={(e) => {handleModal('trash'), setServiceId(e.target.getAttribute('data-id'), setOldStar(e.target.getAttribute('data-star')))}}>Delete</button>
              </div>
            </div>
          )})
        ) : 'No review yet'}
        <Modal show={show.modal} size="md" popup={true} onClose={() => setShow({modal: false, edit: false, trash: false})}>
          <Modal.Header />
          <Modal.Body>
            {show.edit && (
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Modify the review</h3>
                <form onSubmit={handleEdit}>
                  <textarea name="comment" cols="30" rows="10" placeholder="Enter review details" defaultValue={oldComment} required />
                  <br />
                  <Rating onClick={(value) => setStar(value)} initialRating={star} emptySymbol={<FaStar className="text-black dark:text-white" />} fullSymbol={<FaStar className="text-primary" />} />
                  <br />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            )}

            {show.trash && (
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete?</h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleTrash}>Yes, I'm sure</Button>
                  <Button color="gray" onClick={() => setShow({modal: false, edit: false, trash: false})}>No, cancel</Button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
    </div>
  )
};

export default MyReviews;