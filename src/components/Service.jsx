import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import Rating from 'react-rating'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import useTitle from '../hooks/useTitle'

const Service = () => {

  // Getting data from AuthContext
  const {user} = useContext(AuthContext);

  // Get current location
  const location = useLocation();

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

  // Set page title
  useTitle(`${service?.title || 'Service'}`);

  // Fetch method: GET
  useEffect(() => {
    fetch(`https://legaltix-api.vercel.app/service/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Set data to the state
          setService(data.data.service);
          // Set reviews to the state
          setReviews(data.data.reviews);
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
      serviceTitle: service?.title,
      date: new Date().toLocaleString(),
    };
    // Fetch method: POST
    fetch(`https://legaltix-api.vercel.app/add-review/${slug}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(review)
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

  const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
  const btnClass = "w-full mx-auto rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"

  return (
    <>
      <nav aria-label="breadcrumb" className="w-full px-3 py-10 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white">
          <ol className="flex h-8 space-x-2 w-fit mx-auto">
            <li className="flex items-center">
              <Link rel="noopener noreferrer" to="/" title="Back to homepage" className="flex items-center hover:underline">Home</Link>
            </li>
            <li className="flex items-center">
              <span>/</span>
              <Link to="/services" title="Back to homepage" className="flex pl-2 items-center hover:underline">Services</Link>
            </li>
            <li className="flex items-center space-x-1">
              <span>/</span>
              <p className="flex items-center px-1 capitalize hover:no-underline cursor-default">{service?.title}</p>
            </li>
          </ol>
        </nav>

      <article className="px-3 py-24 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="w-full mx-auto space-y-5 text-center">
            <PhotoProvider>
              <PhotoView src={service?.thumbnail?.url}>
                <img src={service?.thumbnail?.url} alt="" className="rounded-lg" />
              </PhotoView>
            </PhotoProvider>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl pt-5">{service?.title}</h1>
            <div className="text-sm text-gray-600 space-y-1 dark:text-white">
              <img src={service?.userPhoto?.url} alt="" className="self-center mx-auto flex-shrink-0 w-10 h-10 border rounded-full md:justify-self-start bg-gray-500 border-gray-300" />
              <p className="text-blue-600 pt-3 dark:text-white"><span itemProp="name">{service?.userName}</span></p>
              <p dateTime="2021-02-12 15:34:18-0200">{service?.date}</p>
              <div className="flex items-center justify-center">
                <Rating className="mr-2 mt-1" readonly placeholderRating={service?.rating} emptySymbol= {<FaStar className="text-black dark:text-white" />} placeholderSymbol= {<FaStar className="text-primary" />} /> <p>({service?.reviewCount || 0})</p>
              </div>
            </div>
          </div>
          <div className="text-gray-800 space-y-5 dark:text-white">
            <h2 className="text-2xl font-bold ">Pirce: ${service?.price}</h2>
            <p className="text-lg">{service?.description}</p>
          </div>
          <div className="border-t border-gray-300">

          {
          user?.uid ? 
          (
            reviews?.find(review => review?.userId === user?.uid) === undefined ? (
              <form onSubmit={handleAddReview} className="flex flex-col gap-5 justify-center">
                <input type="text" name="name" className={inputClasses} placeholder="Enter your name" defaultValue={user?.displayName} readOnly={user?.displayName && true} required />
                <textarea name="comment" cols="30" rows="5" className={inputClasses} placeholder="Enter review details" required />
                <Rating className="w-fit mx-auto text-2xl" onClick={(value) => setStar(value)} initialRating={star} emptySymbol={<FaStar className="text-black dark:text-white" />} fullSymbol={<FaStar className="text-primary" />} />
                <input className={btnClass} type="submit" value="Submit" />
              </form>) : <h2 className="text-xl text-center my-10">You Already reviewed</h2>
          ) : <h4 className="text-xl text-center my-10">Please <Link to="/login" state={{from: location}} replace className="text-blue-600" >Login</Link> to add a review</h4>
          }

          {reviews.length ? (
          reviews?.map(review => {
          return (
            <div key={review?._id} className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 dark:bg-gray-900 dark:text-gray-100">
                <div className="flex justify-between p-4">
                  <div className="flex space-x-4">
                    <div>
                      <img src={review?.userPhoto} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-bold">{review?.name}</h4>
                      <span className="text-xs dark:text-gray-400">{review?.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 dark:text-yellow-500">
                    <Rating readonly placeholderRating={review?.star} emptySymbol= {<FaStar className="text-black dark:text-white" />} placeholderSymbol= {<FaStar className="text-primary" />}/>
                    <span className="text-xl font-bold mb-0.5">{review?.star}</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm dark:text-gray-400">
                  <p className="text-lg">{review?.comment}</p>
                </div>
              </div>
            </div>
          )})
        ) : <img className="h-24 mx-auto mt-10" src="/no-review-found.png" alt="" /> }
          </div>
        </div>
      </article>
    </>
  )
};

export default Service;