import { useEffect } from 'react'

const useTitle = title => {
  useEffect(() => {
    document.title = `${title} - Legaltix`
  }, [title])
};

export default useTitle;