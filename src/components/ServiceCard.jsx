import React from 'react'
import { Card } from 'flowbite-react'
import Rating from 'react-rating'
import { FaStar } from 'react-icons/fa'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { Link } from 'react-router-dom'

const ServiceCard = ({service}) => {

  return (
    <div className="max-w-sm mx-auto">
      <Card>
        <PhotoProvider>
          <PhotoView src={service?.thumbnail?.url}>
            <img src={service?.thumbnail?.url} alt={service?.title} className="h-[220px] w-[500px] rounded-lg cursor-pointer" />
          </PhotoView>
        </PhotoProvider>
        <div className="flex items-center space-x-4">
          <div className="shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src={service?.userPhoto?.url}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {service?.userName}
            </p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
              User ID: {service?.userId.substring(0, 10)}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          ${service?.price}
          </div>
        </div>
        <Link to={`/service/${service?.slug}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {service?.title}
          </h5>
        </Link>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {service?.description.substring(0, 100) + '...'}
        </p>
        <div className="flex items-center justify-between">
          <div className="mt-2.5 mb-2 flex items-center">
            <Rating className="mt-1" readonly placeholderRating={service?.rating} emptySymbol= {<FaStar className="text-black dark:text-white" />} placeholderSymbol= {<FaStar className="text-primary" />} />
            <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
            {service?.reviewCount || 0}
            </span>
          </div>
          <Link to={`/service/${service?.slug}`}className="btn-sm">View Details</Link>
        </div>
      </Card>
    </div>
  )
};

export default ServiceCard;