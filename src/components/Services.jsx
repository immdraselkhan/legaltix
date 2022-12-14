import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useTitle from '../hooks/useTitle'
import ServiceCard from './ServiceCard'

const Services = () => {

  // Set page title
  useTitle('Services');

  // All services state
  const [services, setServices] = useState([]);

  // Fetch method: GET
  useEffect(() => {
    fetch('https://legaltix-api.vercel.app/services')
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
      <nav aria-label="breadcrumb" className="w-full px-3 py-10 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white">
        <ol className="flex h-8 space-x-2 w-fit mx-auto">
          <li className="flex items-center">
            <Link to="/" title="Back to homepage" className="flex items-center hover:underline">Home</Link>
          </li>
          <li className="flex items-center space-x-1">
            <span>/</span>
            <a href="#" className="flex items-center px-1 capitalize hover:no-underline cursor-default">Services</a>
          </li>
        </ol>
      </nav>

      <section className="px-2 py-16 dark:bg-gray-600 dark:text-white">
        <div className="max-w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <h2 className="text-3xl font-semibold leading-none grid-child-auto mx-auto mb-5">All Services To Review</h2>
          {services?.map(service => <ServiceCard key={service?._id} service={service} />)}
        </div>
      </section>
    </>
  )
};

export default Services;