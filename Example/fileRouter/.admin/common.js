import { useEffect } from 'react'
import NProgress from 'nprogress'

export function Fallback() {
  useEffect(() => {
    NProgress.start()
    return NProgress.done
  }, [])
  return null
}
