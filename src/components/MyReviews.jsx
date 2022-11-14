import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/UserContext'
import Rating from 'react-rating'
import { Button, Modal} from 'flowbite-react'
import { FaStar } from 'react-icons/fa'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { toast } from 'react-toastify'
import useTitle from '../hooks/useTitle'
import { Link } from 'react-router-dom'

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
    fetch(`https://legaltix-api.vercel.app/my-reviews/edit/${serviceId}`, {
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
    fetch(`https://legaltix-api.vercel.app/my-reviews/delete/${serviceId}`, {
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
    fetch(`https://legaltix-api.vercel.app/my-reviews/${user?.uid}`, {
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
    <>
      <nav aria-label="breadcrumb" className="w-full px-3 py-10 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white">
        <ol className="flex h-8 space-x-2 w-fit mx-auto">
          <li className="flex items-center">
            <Link to="/" title="Back to homepage" className="flex items-center hover:underline">Home</Link>
          </li>
          <li className="flex items-center space-x-1">
            <span>/</span>
            <p className="flex items-center px-1 capitalize hover:no-underline cursor-default">My Reviews</p>
          </li>
        </ol>
      </nav>

      <section className="dark:bg-gray-600">
        <div className="max-w-[1460px] mx-auto px-3 py-10 space-y-5">
          {reviews.length ? (
            reviews?.map(review => {
            return (
              <div key={review?._id} className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <div className="container flex flex-col w-full shadow-lg max-w-lg p-6 mx-auto divide-y rounded-lg divide-gray-700 dark:bg-gray-900 dark:text-gray-100">
                  <div className="flex flex-wrap gap-5 justify-between p-4">
                    <div className="flex space-x-4">
                      <div>
                        <img src={review?.userPhoto} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-bold">{review?.name} ✅</h4>
                        <span className="text-xs dark:text-gray-400">{review?.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 dark:text-yellow-500">
                      <Rating readonly placeholderRating={review?.star} emptySymbol= {<FaStar className="text-black dark:text-white" />} placeholderSymbol= {<FaStar className="text-primary" />}/>
                      <span className="text-xl font-bold mb-0.5">{review?.star}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 text-sm dark:text-gray-400">
                    <div>
                      <Link to={`/service/${review?.slug}`} className="text-xl font-bold">{review?.serviceTitle}</Link>
                    </div>
                    <p className="text-lg">{review?.comment}</p>
                    <div className="flex justify-between pt-5">
                      <button className="btn-sm" data-id={review?.serviceId} data-star={review?.star} data-comment={review?.comment} onClick={(e) => {handleModal('edit'), setServiceId(e.target.getAttribute('data-id')), setStar(e.target.getAttribute('data-star')), setOldStar(e.target.getAttribute('data-star')), setOldComment(e.target.getAttribute('data-comment'))}}>Edit</button>
                      <button className="btn-sm-warning" data-id={review?.serviceId} data-star={review?.star} onClick={(e) => {handleModal('trash'), setServiceId(e.target.getAttribute('data-id'), setOldStar(e.target.getAttribute('data-star')))}}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )})
          ) : <div className="min-h-[calc(100vh_-_388px)] flex items-center grid-child-auto mx-auto w-fit"><img className="h-24" src="/no-review-found.png" alt="" /></div> }
        </div>

        <Modal show={show.modal} size="md" popup={true} onClose={() => setShow({modal: false, edit: false, trash: false})}>
          <Modal.Header />
          <Modal.Body>
            {show.edit && (
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Modify the review</h3>
                <form className="space-y-3" onSubmit={handleEdit}>
                  <textarea className="input-filed" name="comment" cols="30" rows="10" placeholder="Enter review details" defaultValue={oldComment} required />
                  <br />
                  <Rating className="text-xl space-x-1" onClick={(value) => setStar(value)} initialRating={star} emptySymbol={<FaStar className="text-black dark:text-white" />} fullSymbol={<FaStar className="text-primary" />} />
                  <br />
                  <input className="btn-md" type="submit" value="Submit" />
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
      </section>
    </>
  )
};

export default MyReviews;