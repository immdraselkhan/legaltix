import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rating from 'react-rating'
import { Card } from 'flowbite-react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import ServiceCard from './ServiceCard'

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
    <>
      <section className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold sm:text-6xl" style={{lineHeight: "1.2em"}}>Affordable<br />
              <span className="text-blue-600">Legal Access</span><br />For All
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">Our network of experienced lawyers can provide advice on legal issues for you, your family, or your business, all directly through our app.
              <br className="hidden md:inline lg:hidden" />With no hourly fee or retainer, we help you worry less and live more. What are you waiting for?
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link rel="noopener noreferrer" to="/services" className="px-8 py-3 text-lg font-semibold rounded bg-blue-600 text-gray-50">All Services</Link>
              <Link rel="noopener noreferrer" to="/login" className="px-8 py-3 text-lg font-semibold border rounded border-gray-800 dark:border-gray-100">Login</Link>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-20 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img src="/home-hero-banner.png" alt="" className="object-contain h-72 sm:h-80 lg:h-[500px] xl:h-112 2xl:h-128" />
          </div>
        </div>
      </section>

      <section className="max-w-[1460px] mx-auto px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-20">
        {services?.map(service => <ServiceCard key={service?._id} service={service} />)}
        <div className="grid-cols-[1 / -1] mx-auto mt-10">
          <Link rel="noopener noreferrer" to="/services" className="px-8 py-3 text-lg font-semibold rounded bg-blue-600 text-gray-50">All Services</Link>
        </div>
      </section>

    </>
  )
};

export default Home;