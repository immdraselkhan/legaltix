import React from 'react'
import useTitle from '../hooks/useTitle'

const Blog = () => {

  // Set page title
  useTitle('Blog');

  return (
    <article className="py-20 bg-slate-50 dark:bg-[#0B1120]">
      <div className="max-w-3xl px-3 mx-auto">
        <div className="text-2xl lg:text-3xl font-bold text-center my-10">
          <h2 className="dark:text-white">Freequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h2 className="font-medium text-gray-900">What are the differences between SQL and NoSQL?</h2>
              <svg className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" troke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-white">Build, Deploy and Manage Relational & NonRelational Databases in the Secure Amazon Cloud. Experience the Ease, Security & Reliability of Building a Database with AWS for Free. Sign Up For Free. AWS Free Tier. Create a Free Account. In-Memory Caching. SQL databases are vertically scalable, while NoSQL databases are horizontally scalable. SQL databases are table-based, while NoSQL databases are document, key-value, graph, or wide-column stores. SQL databases are better for multi-row transactions, while NoSQL is better for unstructured data like documents or JSON.</p>
          </details>
          <details className="group">
            <summary
              className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h2 className="font-medium text-gray-900">What is JWT, and how does it works?</h2>
              <svg className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" troke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-white">JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.</p>
          </details>
          <details className="group">
            <summary
              className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h2 className="font-medium text-gray-900">What is the difference between javascript and NodeJS?</h2>
              <svg className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" troke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-white">JavaScript is a simple programming language that can be used with any browser that has the JavaScript Engine installed. Node. js, on the other hand, is an interpreter or execution environment for the JavaScript programming language.</p>
          </details>
          <details className="group">
            <summary
              className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h2 className="font-medium text-gray-900">How does NodeJS handle multiple requests at the same time?</h2>
              <svg className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" troke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-white">How NodeJS handle multiple client requests? NodeJS receives multiple client requests and places them into EventQueue. NodeJS is built with the concept of event-driven architecture. NodeJS has its own EventLoop which is an infinite loop that receives requests and processes them.</p>
          </details>
        </div>
      </div>
    </article>
  )
};

export default Blog;