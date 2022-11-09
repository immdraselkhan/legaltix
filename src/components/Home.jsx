import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rating from 'react-rating'
import { FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Home = () => {

  // useNavigate hook
  const navigate = useNavigate()

  // All services state
  const [services, setServices] = useState([]);

  // Fetch method: GET
  useEffect(() => {
    fetch('http://localhost:8000/services?total=3')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Set data to the state
          setServices(data.data);
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
    <section>
      <div>
        <div className="grid grid-cols-3">
          {services?.map(service => {
            return(
            <div onClick={() => navigate(`/service/${service?.slug}`)} key={service?._id} className="cursor-pointer">
              <img src={service?.thumbnail?.url} alt="" />
              <h3>{service?.title}</h3>
              <p>{service?.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={service?.userPhoto?.url} alt="" />
                  <p>{service?.userName}</p>
                  <div className="flex items-center gap-1">
                    <Rating className="mt-1" readonly placeholderRating={`${service?.rating}`} emptySymbol= {<FaStar className="text-black dark:text-white" />} placeholderSymbol= {<FaStar className="text-primary" />} />
                    <span>({service?.reviewCount})</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <p>{service?.price}</p>
                  <Link to={`/service/${service?.slug}`}>Details</Link>
                </div>
              </div>
            </div>)
          })}
        </div>
        <div>
          <Link to="/services">All Services</Link>
        </div>
      </div>
    </section>
  )
};

export default Home;