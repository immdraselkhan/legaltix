import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'react-photo-view/dist/react-photo-view.css'
import { toast } from 'react-toastify'
import ServiceCard from './ServiceCard'

const Home = () => {

  // All services state
  const [services, setServices] = useState([]);

  // Fetch method: GET
  useEffect(() => {
    fetch('https://legaltix-api.vercel.app/services?total=3')
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
      <section className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 h-auto lg:h-screen flex items-center py-10 lg:py-0">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black" style={{lineHeight: "1.2em"}}>Let's Review<br />
              <span className="text-blue-600">Legal Services</span>
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">Our network of experienced lawyers can provide advice on legal issues for you, your family, or your business, all directly through our app.
              <br className="hidden md:inline lg:hidden" />With no hourly fee or retainer, we help you worry less and live more. What are you waiting for?
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link to="/services" className="btn-lg">Get Started</Link>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-20 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img src="/home-hero-banner.png" alt="" className="object-contain h-72 sm:h-80 lg:h-[500px] xl:h-112 2xl:h-128" />
          </div>
        </div>
      </section>

      <section className="px-2 py-10 lg:py-16 dark:bg-gray-600 dark:text-white">
        <div className="max-w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <h2 className="text-3xl font-semibold leading-none grid-child-auto mx-auto my-5 lg:mt-0 lg:mb-5">New Services To Review</h2>
          {services?.map(service => <ServiceCard key={service?._id} service={service} />)}
          <div className="grid-child-auto mx-auto mt-5 mb-5 lg:mb-0">
            <Link to="/services" className="self-center lg:self-start btn-lg">View All</Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 py-5 md:py-0 lg:pb-0">
        <div className="max-w-[1460px] mx-auto px-3 container flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/3">
            <img src="/how-we-help.jpg" className="mx-auto py-16 rounded-lg hidden lg:block" alt="" />
          </div>
          <div className="text-center lg:text-left flex flex-col w-full px-6 my-8 lg:w-2/3 md:p-8 lg:p-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-8 text-blue-600 mx-auto lg:ml-0">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <h2 className="text-3xl font-semibold leading-none" style={{lineHeight: "1.5em"}}>How Legaltix Can Help</h2>
            <p className="mt-4 mb-8 text-lg">Here are individual person who have experience in nearly every area of law. You can consult with your require Legaltix expert on many common legal topics and they will work diligently to find a resolution. Dive deeper into some of the most common practice areas.</p>
            <Link to="/services" className="self-center lg:self-start btn-lg">All Services</Link>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-600 dark:text-white text-black">
        <div className="container px-3 py-10 lg:py-12 mx-auto">
          <div className="grid items-center gap-4 xl:grid-cols-5">
            <div className="max-w-2xl mx-auto my-5 space-y-0 text-center xl:col-span-2 xl:text-left">
              <h2 className="text-3xl font-bold" style={{lineHeight: "1.5em"}}>What Our Customers Are Saying About Our Legal Services</h2>
              <p className="text-gray-600 text-lg dark:text-white">We've been trusted by 1000 business owners worldwide since 2022. See what your fellow entrepreneurs are saying about Legaltix.</p>
            </div>
            <div className="py-6 xl:col-span-3">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="grid content-center gap-5">
                  <div className="p-6 rounded-lg shadow-md text-gray-900 dark:bg-gray-900 dark:text-white">
                    <p>"You guys are doing great and making the process simple. Opti-tru is moving to Wix, and if you can offer me a deal, ill leave the best reviews and sponsor my company by Legaltix... I mean, we have the same colors. Thank you."</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img src="https://source.unsplash.com/50x50/?portrait?1" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500" />
                      <div>
                        <p className="text-lg font-semibold">Dylan Willox</p>
                        <p className="text-sm text-gray-600 dark:text-white">NC, United States</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-lg shadow-md text-gray-900 dark:bg-gray-900 dark:text-white">
                    <p>"I did research before I got started and was still nervous about the process. Once I started everything was simple and now I just wait for the State to finish filing. I'm happy I took the first step and it wasn't a difficult one."</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img src="https://source.unsplash.com/50x50/?portrait?2" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500" />
                      <div>
                        <p className="text-lg font-semibold">Ugonna A.</p>
                        <p className="text-sm text-gray-600 dark:text-white">MN, United States</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid content-center gap-5">
                  <div className="p-6 rounded-lg shadow-md text-gray-900 dark:bg-gray-900 dark:text-white">
                    <p>"This did not take too long. The only thing that took a few minutes was trying to figure out what to fill in in the "Industry" keyword area. Nothing really fits. Then because of what I chose, later in the process, I was alerted to needing 2 licenses (for another $99.00) which I don't think I need (so I did not purchase them). Overall, I was pleased with the ease of the process and the price is competitive."</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img src="https://source.unsplash.com/50x50/?portrait?3" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500" />
                      <div>
                        <p className="text-lg font-semibold">Gretchen Tyler</p>
                        <p className="text-sm text-gray-600 dark:text-white">NV, United States</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-lg shadow-md text-gray-900 dark:bg-gray-900 dark:text-white">
                    <p>"I have filed for LLCs in the past and been surprised at uncontrollable fees. I was tired of being charged fees that I felt I never agreed to. Legaltix made the process easy and affordable. They allowed me to choose what parts of opening an LLC I wanted to do on my own and which ones that I didn't feel comfortable with, allowing them to handle it for me. It's quick, affordable and easy working with Legaltix. I will be back and would recommend them to everyone."</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img src="https://source.unsplash.com/50x50/?portrait?4" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500" />
                      <div>
                        <p className="text-lg font-semibold">Chris Wilson</p>
                        <p className="text-sm text-gray-600 dark:text-white">PA, United States</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default Home;