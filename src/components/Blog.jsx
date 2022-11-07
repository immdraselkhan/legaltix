import React from 'react'

const Blog = () => {
  return (
    <article className="py-20 bg-slate-50 dark:bg-[#0B1120]">
      <div className="max-w-3xl px-3 mx-auto">
        <div className="text-2xl lg:text-3xl font-bold text-center my-10">
          <h2 className="dark:text-white">Freequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h2 className="font-medium text-gray-900">What is cors?</h2>
              <svg className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" troke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-white">CORS stands for Cross-Origin Resource Sharing. It allows us to relax the security applied to an API. This is done by bypassing the Access-Control-Allow-Origin headers, which specify which origins can access the API. In other words, CORS is a browser security feature that restricts cross-origin HTTP requests with other servers and specifies which domains access your resources.</p>
          </details>
          <details className="group">
            <summary
              className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h2 className="font-medium text-gray-900">Why are you using firebase? What other options do you have to implement authentication?</h2>
              <svg className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" troke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-white">Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.</p>
          </details>
          <details className="group">
            <summary
              className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h2 className="font-medium text-gray-900">How does the private route work?</h2>
              <svg className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" troke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-white">The private route component is similar to the public route, the only change is that redirect URL and authenticate condition. If the user is not authenticated he will be redirected to the login page and the user can only access the authenticated routes If he is authenticated (Logged in).</p>
          </details>
          <details className="group">
            <summary
              className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
              <h2 className="font-medium text-gray-900">What is Node? How does Node work?</h2>
              <svg className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" troke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-white">It is a used as backend service where javascript works on the server-side of the application. This way javascript is used on both frontend and backend. Node. js runs on chrome v8 engine which converts javascript code into machine code, it is highly scalable, lightweight, fast, and data-intensive.</p>
          </details>
        </div>
      </div>
    </article>
  )
};

export default Blog;