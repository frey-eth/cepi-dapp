import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

const useUrlParams = () => {
  const searchParams = useSearchParams()

  ///Create new search params string by merging current
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const query = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      return params.get(name)
    },
    [searchParams]
  )

  return useMemo(() => {
    return { createQueryString, query }
  }, [createQueryString, query])
}

export default useUrlParams
