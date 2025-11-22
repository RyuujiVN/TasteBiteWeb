/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

const useDebounce = (value, delay, setSearchParams) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value != null) {
        setDebouncedValue(value)
        setSearchParams({
          search: value
        })
      }
    }, delay)

    return () => clearTimeout(handler)
  }, [value])

  return debouncedValue
}

export default useDebounce