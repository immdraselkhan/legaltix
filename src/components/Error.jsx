import React from 'react'
import useTitle from '../hooks/useTitle'

const Error = () => {

  // Set page title
  useTitle('Not Found');

  return (
    <div>Error</div>
  )
};

export default Error;