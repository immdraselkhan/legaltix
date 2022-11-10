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
        <h2 className="text-3xl font-semibold leading-none grid-cols-[1 / -1] mx-auto mb-10">New Services</h2>
        {services?.map(service => <ServiceCard key={service?._id} service={service} />)}
        <div className="grid-cols-[1 / -1] mx-auto mt-10">
          <Link rel="noopener noreferrer" to="/services" className="px-8 py-3 text-lg font-semibold rounded bg-blue-600 text-gray-50">All Services</Link>
        </div>
      </section>

      <section className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
        <div className=" max-w-[1460px] mx-auto px-2 container flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/3">
            <img src="/how-we-help.jpg" className="mx-auto py-16 rounded-lg" alt="" />
          </div>
          <div className="text-center lg:text-left flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-8 text-blue-600 mx-auto lg:ml-0">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <h2 className="text-3xl font-semibold leading-none">How Legaltix Can Help</h2>
            <p className="mt-4 mb-8 text-xl">Here are individual person who have experience in nearly every area of law. You can consult with your require Legaltix expert on many common legal topics and they will work diligently to find a resolution. Dive deeper into some of the most common practice areas.</p>
            <Link to="/services" className="self-center lg:self-start px-8 py-3 text-lg font-semibold rounded bg-blue-600 text-gray-50">Get started</Link>
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid items-center gap-4 xl:grid-cols-5">
            <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
              <h2 className="text-4xl font-bold">Duo assum utroque appetere an</h2>
              <p className="text-gray-600">Pri ex magna scaevola moderatius. Nullam accommodare no vix, est ei diceret alienum, et sit cetero malorum. Et sea iudico consequat, est sanctus adipisci ex.</p>
            </div>
            <div className="p-6 xl:col-span-3">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid content-center gap-4">
                  <div className="p-6 rounded-lg shadow-md text-gray-900 dark:bg-gray-900 dark:text-white">
                    <p>An audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img src="https://source.unsplash.com/50x50/?portrait?1" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500" />
                      <div>
                        <p className="text-lg font-semibold">Leroy Jenkins</p>
                        <p className="text-sm text-gray-600 dark:text-gray-200">CTO of Company Co.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-lg shadow-md text-gray-900 dark:bg-gray-900 dark:text-white">
                    <p>Sit wisi sapientem ut, pri civibus temporibus voluptatibus et, ius cu hinc fabulas. Nam meliore minimum et, regione convenire cum id. Ex pro eros mucius consectetuer, pro magna nulla nonumy ne, eam putent iudicabit consulatu cu.</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img src="https://source.unsplash.com/50x50/?portrait?2" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500" />
                      <div>
                        <p className="text-lg font-semibold">Leroy Jenkins</p>
                        <p className="text-sm text-gray-600">CTO of Company Co.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid content-center gap-4">
                  <div className="p-6 rounded-lg shadow-md text-gray-900 dark:bg-gray-900 dark:text-white">
                    <p>Putant omnium elaboraret per ut. Id dicta tritani nominavi quo, mea id justo errem elaboraret. Agam mollis scripserit ea his, ut nec postea verear persecuti. Ea noster senserit eam, ferri omittantur ei nec. Id mel solet libris efficiantur, commune explicari et eos. Case movet ad est, sed tota vocent appetere ea.</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img src="https://source.unsplash.com/50x50/?portrait?3" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500" />
                      <div>
                        <p className="text-lg font-semibold">Leroy Jenkins</p>
                        <p className="text-sm text-gray-600">CTO of Company Co.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-lg shadow-md text-gray-900 dark:bg-gray-900 dark:text-white">
                    <p>Te omnes virtute volutpat sed. Ei esse eros interesset vel, ei populo denique ocurreret vix, eu cum pertinax mandamus vituperatoribus. Solum nihil luptatum per ex, ei amet viderer eos. Ea illum labitur mnesarchum pro. Eius meis salutandi ei nam, alterum expetenda et nec. Expetenda intellegat at eum, per mazim sanctus honestatis ad. Ei noluisse invenire vix. Te ancillae patrioque qui, probo bonorum vivendum ex vim.</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img src="https://source.unsplash.com/50x50/?portrait?4" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500" />
                      <div>
                        <p className="text-lg font-semibold">Leroy Jenkins</p>
                        <p className="text-sm text-gray-600">CTO of Company Co.</p>
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